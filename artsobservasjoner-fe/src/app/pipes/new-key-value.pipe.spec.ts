import { NewKeyValuePipe } from './new-key-value.pipe';

describe('NewKeyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new NewKeyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
