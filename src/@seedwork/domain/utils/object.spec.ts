import { deepFreeze } from "./object"

describe('object Unit tests', () => {

  it('should not freeze a scalar value', () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string')

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean')

    boolean = deepFreeze(false);
    expect(typeof boolean).toBe('boolean')

    const number = deepFreeze(5);
    expect(typeof number).toBe('number')
  })

  it('should must be a immutable objt', () => {
    const obj = deepFreeze({ prop1: "value1", deep: { prop2: 'value2', prop3: new Date() } });

    expect(() => { (obj as any).prop1 = 'aaaaaaaa' }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")
    
    expect(() => { (obj as any).deep.prop2 = 'aaaaaaaa' }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")
    
    expect(obj.deep.prop3).toBeInstanceOf(Date)

    // expect(typeof obj).toBe('string')
  })
})