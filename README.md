# Smart Crop Content Plugin

**v 1.1.0**

Обрезает контент до определенной длины сохраняя при этом его HTML оформление. То есть, Вы с легкостью можете обрезать контент имеющий ссылки, списки и даже таблицы.

Examples: [https://jsfiddle.net/jquery_smart/9Lx8opuk/](https://jsfiddle.net/jquery_smart/9Lx8opuk/)

## API Plugin

Название | По-умолчанию | Тип | Описание | data-атрибут
-------- | ------------ | --- | -------- | ------------
length | 200 | number | Длина обрезаемого контента | data-crop-length
more | Show more | string | Текст кнопки, показывающий полный текст | data-crop-more
less | Hide | string | Текст кнопки, показывающий обрезанный текст | data-crop-less
ending | ... | string | Окончание добавляемое к обрезанному тексту | data-crop-ending
html | true | boolean | true - сохраняет HTML при обрезании<br>false - удаляет HTML при обрезании | data-crop-html
hiddenTags | false | boolean | false - не обращать внимания на скрытые элементы | data-crop-hidden-tags

## Usage Plugin

**Использование в javaScript:**
```
$('.content').smartCropText({
	length: 50,
});
```
---
**Использование через data-атрибуты:**
```
<div data-crop-length="50">
    <p>
        <b><span style="color: #489219;">Lorem ipsum</span></b> dolor sit amet, consectetur adipiscing elit.
    </p>
</div>
```

Замечания и предложения присылайте на [jquery.smart@gmail.com](mailto:jquery.smart@gmail.com)
