# Smart Crop Content Plugin

**v 1.1.0**

Plugin crops content to a needed length saving HTML tags. With this you can easily crop content having hypertext references, lists and even tables.

Examples: [https://jsfiddle.net/jquery_smart/9Lx8opuk/](https://jsfiddle.net/jquery_smart/9Lx8opuk/)

## API Plugin

Name     | Default      | Type| Description | data-attribute
-------- | ------------ | --- | ----------- | --------------
length | 200 | number | Длина обрезаемого контента | data-crop-length
more | Show more | string | Текст кнопки, показывающей полный текст | data-crop-more
less | Hide | string | Текст кнопки, показывающей обрезанный текст | data-crop-less
ending | ... | string | Окончание, добавляемое к обрезанному тексту | data-crop-ending
html | true | boolean | true - сохраняет HTML при обрезке<br>false - удаляет HTML при обрезке | data-crop-html
hiddenTags | false | boolean | false - не учитывать скрытые элементы | data-crop-hidden-tags

## How to use the Plugin

**Using in js:**
```
$('.content').smartCropContent({
	length: 50
});
```
---
**Using via data-attributes**
```
<div data-crop-length="50">
    <p>
        <b><span style="color: #489219;">Lorem ipsum</span></b> dolor sit amet, consectetur adipiscing elit.
    </p>
</div>
```

---

Please sent your feedback to [jquery.smart@gmail.com](mailto:jquery.smart@gmail.com)