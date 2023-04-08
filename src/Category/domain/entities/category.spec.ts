import { Category, CategoryProperties } from "./Category"
import { omit } from "lodash"
import { validate as uuidValidate } from "uuid"
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo"
describe("Category Unit Test", () => {
  test("Constructor of category", () => {
    //Arrange
    let category = new Category({ name: "Movie" })
    let props = omit(category.props, "created_at")
    //Act
    //Assert
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    })

    expect(category.props.created_at).toBeInstanceOf(Date)

    category = new Category({
      name: "Movie",
      description: "Some description",
      is_active: false,
    })

    let created_at = new Date()
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      is_active: false,
      created_at,
    })

    category = new Category({
      name: "Movie",
      description: "Other description",
    })

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description",
    })

    category = new Category({
      name: "Movie",
      is_active: true,
    })

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    })
    created_at = new Date()
    category = new Category({
      name: "Movie",
      created_at,
    })

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    })
  })

  test("id field", () => {
    type CategoryData = {
      props: CategoryProperties,
      id?: UniqueEntityId
    }
    const data: CategoryData[] = [
      {
        props: {
          name: "Movie",
        },
      },
      {
        props: {
          name: "Movie",
        },
        id: null,
      },
      {
        props: {
          name: "Movie",
        },
        id: undefined,
      },
      {
        props: {
          name: "Movie",
        },
        id: new UniqueEntityId()
      },
    ]
    data.forEach((i) => {
      const category = new Category(i.props, i.id)
      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" })
    expect(category.name).toBe("Movie")
  })

  test("getter and setter of description field", () => {
    let category = new Category({
      name: "Movie",
    })
    expect(category.description).toBeNull

    category = new Category({ name: "Movie", description: "some description" })
    expect(category.description).toBe("some description")

    category = new Category({
      name: "Movie",
    })

    category["description"] = "other description"

    expect(category.description).toBe("other description")

    category["description"] = undefined

    expect(category.description).toBeNull()
  })

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    })

    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: "Movie",
      is_active: true,
    })

    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: "Movie",
      is_active: false,
    })

    expect(category.is_active).toBeFalsy()
  })

  test("getter of created_at", () => {
    let category = new Category({
      name: "Movie",
    })

    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: "Movie",
      created_at,
    })

    expect(category.created_at).toBe(created_at)
  })
})
