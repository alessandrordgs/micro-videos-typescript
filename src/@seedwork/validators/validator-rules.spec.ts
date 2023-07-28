import ValidationError from "@seedwork/errors/validation-error";
import ValidatorRules from "./validator-rules"

describe("ValidatorRules Unit test", () => {
  test("values method", () => {
    const validator = ValidatorRules.values('some value', 'field')

    expect(validator['value']).toBe('some value')
    expect(validator['property']).toBe('field')
  });

  test('Required validation rule', () => {
    //validos
    const validator = ValidatorRules.values('some value', 'field').required()
    expect(() => ValidatorRules.values(null, 'field').required()).toThrow(new ValidationError(`$The field must be a string`))
  })
})