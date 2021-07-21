- [x] Валидация наличия transform для name
- [ ] Получение информации об неразрезолвленных токенах
- [ ] Реализовать devtools для отладки в браузере
- [ ] Хуки также позволят создать builtin хук, который будет записывать хэш в хэд файлов для инвалидации
- [ ] Подумать про то, чтобы output был массивом, т.к. есть ощущение, чт олюди п утаются зачем там объект нужен типо oputput::css
- [ ] Разобраться с типами для Map, почему-то get возвращает без undefined (возможно из-за strict )
- [ ] Подумать про надобность типов в трансформерах
- [ ] Использовать классы для токенов + сериализация (можно будет заменить cache в резолвине вместо массива использовать ссылку на ноду)


## CLI

- [ ] Добавить время выполнения
- [ ] Добавить silence mode (возможно что-то есть в oclif)
- [ ] Реализовать хуки (посмотреть на graphql-codegen)
- [ ] Реализовать форматирование внутри хука (builtin)
- [ ] Избавиться от бэм-платформ (legacy)
- [ ] Добавить телеметрию
- [ ] Добавить verbose/debug мод для отладки


## Core

- [ ] Написать unit для camelCase алиаса (сейчас только в одну сторону есть тест)
- [ ] Кажется, что стоит удалить attributes из токена, т.к. на данный момент он нигде не используется

## Infra

- [ ] Добавить tsconfig references

## Компилятор переменных

- [x] Записать в ref несколько значений
- [x] Написать тест
- [ ] Подумать про sources-map для ошибок



## Миграция

1. value/color-function — actions
1. useComments — обсудить
1. name/cti/kebab
1. API params


```ts
class TokenNode implements Token {
  static create(shape: Token) {
    return new TokenNode(shape)
  }

  name: string
  value: TokenValue
  path: string[]
  attributes: Record<string, any>
  refs: Pick<TokenBase, 'value' | 'name'>[]
  original: Pick<TokenBase, 'value'>

  constructor(shape: Token) {
    Object.assign(this, shape)
  }
}
```
