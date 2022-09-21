import { inputValidation } from 'service/util/inputValidation';

describe('src/service/util/inputValidation', () => {
  it('should return true', () => {
    const tempData = {
      data1: 'hello',
      data2: 'world',
    };
    const result = inputValidation(tempData);
    expect(result).toBe(true);
  });
  it('should return false (1)', () => {
    const tempData = {
      data1: 'hello',
      data2: '',
    };
    const result = inputValidation(tempData);
    expect(result).toBe(false);
  });
  it('should return false (2)', () => {
    const tempData = {
      data1: '',
      data2: 'world',
    };
    const result = inputValidation(tempData);
    expect(result).toBe(false);
  });
  it('should return false (3)', () => {
    const tempData = {
      data1: '',
      data2: '',
    };
    const result = inputValidation(tempData);
    expect(result).toBe(false);
  });
});
