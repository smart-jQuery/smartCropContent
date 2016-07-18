# Smart Crop Content Plugin

**v 1.1.0**

Обрезает контент до определенной длины, сохраняя при этом его HTML-оформление. То есть, вы с легкостью можете обрезать контент, имеющий ссылки, списки и даже таблицы.

Примеры: [https://jsfiddle.net/jquery_smart/9Lx8opuk/](https://jsfiddle.net/jquery_smart/9Lx8opuk/)

## API Plugin

Название | По умолчанию | Тип | Описание | data-атрибут
-------- | ------------ | --- | -------- | ------------
length | 200 | number | Длина обрезаемого контента | data-crop-length
more | Show more | string | Текст кнопки, показывающей полный текст | data-crop-more
less | Hide | string | Текст кнопки, показывающей обрезанный текст | data-crop-less
ending | ... | string | Окончание, добавляемое к обрезанному тексту | data-crop-ending
html | true | boolean | true - сохраняет HTML при обрезке<br>false - удаляет HTML при обрезке | data-crop-html
hiddenTags | false | boolean | false - не учитывать скрытые элементы | data-crop-hidden-tags

## How to use the Plugin

**Использование в javaScript:**
```
$('.content').smartCropContent({
	length: 50
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

---

Замечания и предложения присылайте на [jquery.smart@gmail.com](mailto:jquery.smart@gmail.com)
