import { generateMock } from '@anatine/zod-mock';
import { act, renderHook } from '@testing-library/react';
import { type ChangeEvent, type FormEvent } from 'react';
import useForm from 'source/feature/common/hooks/use-form';
import { z } from 'zod';

describe('useForm', () => {
  const mockFormEvent = { preventDefault: jest.fn() } as unknown as FormEvent;
  let validator: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
  }>;
  let initialState: z.infer<typeof validator>;

  beforeEach(() => {
    validator = z.object({
      id: z.string().uuid(),
      name: z.string(),
      phone: z.string(),
      address: z.string(),
    });

    initialState = generateMock(validator);
  });

  it('should initialize with state', () => {
    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    expect(result.current.formState).toStrictEqual(initialState);
  });

  it('should replace field error values with undefined after running clearFieldErrors', () => {
    const { result } = renderHook(() => {
      return useForm(
        {
          ...initialState,
          id: 'notanid',
        },
        { zodValidator: validator },
      );
    });

    act(() => {
      result.current.handleSubmit(mockFormEvent);
    });

    expect(result.current.fieldErrors).toStrictEqual({ id: ['Invalid uuid'] });
  });

  it('should set form error if onSubmit throws', () => {
    const onSubmit = jest.fn(() => {
      throw new Error('Test Error');
    });

    const { result } = renderHook(() => {
      return useForm(initialState, { onSubmit });
    });

    act(() => {
      result.current.handleSubmit(mockFormEvent);
    });

    expect(result.current.formError?.message).toBe('Test Error');
  });

  it('should clear field errors and set the formError to null after successful submit', () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() => {
      return useForm(initialState, { onSubmit });
    });

    act(() => {
      result.current.setFormError(new Error('Test Error'));
    });

    expect(result.current.formError?.message).toBe('Test Error');

    act(() => {
      result.current.handleSubmit(mockFormEvent);
    });

    expect(result.current.fieldErrors).toBe(undefined);
    expect(result.current.formError).toBeNull();
  });

  it('should clear field errors', () => {
    const fieldErrors = {
      id: ['Bad id'],
      phone: undefined,
      name: undefined,
      address: undefined,
    };

    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    act(() => {
      result.current.setFieldErrors(fieldErrors);
    });

    expect(result.current.fieldErrors).toStrictEqual(fieldErrors);

    act(() => {
      result.current.clearFieldErrors();
    });

    expect(result.current.fieldErrors).toStrictEqual({
      id: undefined,
      phone: undefined,
      name: undefined,
      address: undefined,
    });
  });

  it('should clear form state', () => {
    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    act(() => {
      result.current.clearForm();
    });

    expect(result.current.formState).toStrictEqual({
      id: undefined,
      name: undefined,
      phone: undefined,
      address: undefined,
    });
  });

  it('should reset form state', () => {
    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    act(() => {
      result.current.setFormState({
        ...result.current.formState,
        name: 'BillyBob',
        address: 'baddaddress',
        id: 'shortid',
      });
    });

    expect(result.current.formState).toStrictEqual({
      name: 'BillyBob',
      address: 'baddaddress',
      id: 'shortid',
      phone: initialState.phone,
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formState).toStrictEqual(initialState);
  });

  it('should return boolean for value if input type is boolean', () => {
    const event = {
      ...mockFormEvent,
      target: {
        type: 'checkbox',
        checked: true,
        name: 'id',
        value: true,
      },
    } as unknown as ChangeEvent;

    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.formState.id).toBe(true);
  });

  it('should return number for value if input type is number', () => {
    const event = {
      ...mockFormEvent,
      target: {
        type: 'number',
        name: 'id',
        value: '123',
      },
    } as unknown as ChangeEvent;

    const { result } = renderHook(() => {
      return useForm(initialState);
    });

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.formState.id).toBe(123);
  });

  it('should run onChange if defined', () => {
    const onChange = jest.fn();
    const mockChangeEvent = {
      target: { value: 'hello' },
    } as unknown as ChangeEvent;

    const { result } = renderHook(() => {
      return useForm(initialState, { onChange });
    });

    act(() => {
      result.current.handleChange(mockChangeEvent);
    });

    expect(onChange).toHaveBeenCalledWith(mockChangeEvent);
  });
});
