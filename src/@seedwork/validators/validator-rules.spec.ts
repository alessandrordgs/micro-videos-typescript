import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rules"

type ExpectedRule = {
  value: any;
  property: string;
  error: any;
  rule?: keyof ValidatorRules;
  params?: any[];
}
function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }
  ).toThrow(new ValidationError(expected.error))
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected)
  }).not.toThrow(new ValidationError(expected.error))
}

function runRule({ value, params = [], property, rule }: Omit<ExpectedRule, 'error'>) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  method.apply(validator, params)
}
describe("ValidatorRules Unit test", () => {
  test("values method", () => {
    const validator = ValidatorRules.values('some value', 'field')

    expect(validator['value']).toBe('some value')
    expect(validator['property']).toBe('field')
  });

  test('Required validation rule', () => {
    //validos

    let arrange: {
      value: any,
      property: string,
      messageError: string
    }[] = [
        { value: null, property: "field", messageError: "The field is required" },
        { value: undefined, property: "field", messageError: "The field is required" },
        { value: "", property: "field", messageError: "The field is required" },
      ]

    arrange.forEach(item => {
      assertIsInvalid(
        { value: item.value, property: item.property, rule: "required", error: item.messageError }
      )
    })

    arrange = [
      { value: "teste", property: "field", messageError: "The field is required" },
      { value: 0, property: "field", messageError: "The field is required" },
      { value: false, property: "field", messageError: "The field is required" },
    ]

    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "required", error: item.messageError })
    })
  })

  test("String validation rule", () => {
    let arrange: {
      value: any,
      property: string,
      messageError: string
    }[] = [
        { value: 5, property: "field", messageError: "The field must be a string" },
        { value: {}, property: "field", messageError: "The field must be a string" },
        { value: false, property: "field", messageError: "The field must be a string" },
      ]

    arrange.forEach(item => {
      assertIsInvalid(
        { value: item.value, property: item.property, rule: "string", error: item.messageError }
      )
    })

    arrange = [
      { value: "teste", property: "field", messageError: "The field must be a string" },
      { value: null, property: "field", messageError: "The field must be a string" },
      { value: undefined, property: "field", messageError: "The field must be a string" },
    ]

    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "string", error: item.messageError })
    })
  })

  test("MaxLength validation rule", () => {
    let arrange: {
      value: any,
      property: string,
      messageError: string
    }[] = [
        { value: "aaaaaa", property: "field", messageError: "The field must be less or equal than 5 characteres" },
        // { value: {}, property: "field", messageError: "The field must be less or equal than 255 characteres" },
        // { value: false, property: "field", messageError: "The field must be less or equal than 255 characteres" },
      ]

    arrange.forEach(item => {
      assertIsInvalid(
        { value: item.value, property: item.property, rule: "maxLength", error: item.messageError, params: [5] }
      )
    })

    arrange = [
      { value: "aaaaa", property: "field", messageError: "The field must be less or equal than 5 characteres" },
      { value: null, property: "field", messageError: "The field must be less or equal than 5 characteres" },
      { value: undefined, property: "field", messageError: "The field must be less or equal than 5 characteres" },
    ]

    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "maxLength", error: item.messageError, params: [5] })
    })
  })
  test("Booelan validation rule", () => {
    let arrange: {
      value: any,
      property: string,
      messageError: string
    }[] = [
        { value: 5, property: "field", messageError: "The field must be a boolean" },
        { value: "true", property: "field", messageError: "The field must be a boolean" },
        // { value: {}, property: "field", messageError: "The field must be less or equal than 255 characteres" },
        // { value: false, property: "field", messageError: "The field must be less or equal than 255 characteres" },
      ]

    arrange.forEach(item => {
      assertIsInvalid(
        { value: item.value, property: item.property, rule: "boolean", error: item.messageError, params: [5] }
      )
    })

    arrange = [
      { value: true, property: "field",  messageError: "The field must be a boolean" },
      { value: false, property: "field",  messageError: "The field must be a boolean" },
      { value: null, property: "field",  messageError: "The field must be a boolean" },
      { value: undefined, property: "field",  messageError: "The field must be a boolean" },
    ]

    arrange.forEach(item => {
      assertIsValid({ value: item.value, property: item.property, rule: "boolean", error: item.messageError, params: [5] })
    })
  })

  test("Should comi")
})