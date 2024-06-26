## Student Model

```js
{
    "gId": number,
    "name": string,
    "degree": string,
    "major": string,
    "wam": number,
    "house": string,
    "subjects": [
        {
            "course_code": string,
            "course_title": string,
            "mark": number,
        }
    ],
    "user_type": "STUDENT"
}
```

## Staff Model
```js
{
    "gId": string,
    "name": string,
    "role": string,
    "faculty": string,
    "education": ['(Dip.) Mending Spirits', '(BA.) Duelling Arts', '(Phd.) Bladed Combative Techniques'],
    "teaching": ['SWRD1121', 'SWRD3331', 'FAIH9417'],
    "user_type": "STAFF"
}
```

## Bulletin Boards
```js
{
    "title": string,
    "body": string
}
```