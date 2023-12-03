## Backend HealthPoint

На текущий момент есть два endpointа:

1. /users/signup Необходим для регистрации пользователя (отправляется POST
   запрос)

```angular2html
{
"email": "use414141r@example.com",
"first_name": "string",
"patronymic_name": "string",
"last_name": "string",
"city": "string",
"password": "string"
}
```

Returns

```
{
   "token": "9c52b8e162d56d33f1d6fa9e7d03a0a2cc3971ee",
   "user": {
      "email": "use414141r@example.com",
      "first_name": "string",
      "last_name": "string",
      "patronymic_name": "string",
      "city": "string",
      "role": "user"
    },
}
```

2. /users/login Необходим для входа пользователя

```
{
  "email": "use414141r@example.com",
  "password": "string"
}
```

Returns:

```
{
   "token": "9c52b8e162d56d33f1d6fa9e7d03a0a2cc3971ee",
   "user": {
      "email": "use414141r@example.com",
      "first_name": "string",
      "last_name": "string",
      "patronymic_name": "string",
      "city": "string",
      "role": "user"
    },
}
```