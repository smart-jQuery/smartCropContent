# Smart Crop Content Plugin

**v 1.1.0**

Plugin crops content to a needed length saving HTML tags. With this you can easily crop content having hypertext references, lists and even tables.

Examples: [https://jsfiddle.net/jquery_smart/9Lx8opuk/](https://jsfiddle.net/jquery_smart/9Lx8opuk/)

## Installation
```
bower install smart-crop-content
```
or just download smartCropContent.js from the git repository.

## API

Name     | Default      | Type| Description | data-attribute
-------- | ------------ | --- | ----------- | --------------
length | 200 | number | The length for which content is to be cropped | data-crop-length
more | Show more | string | Caption of the button, showing the source text | data-crop-more
less | Hide | string | Caption of the button, showing the cropped text | data-crop-less
ending | ... | string | Ending which is to be added to the cropped text | data-crop-ending
html | true | boolean | true - save HTML tags<br>false - delete HTML tags when cropping | data-crop-html
hiddenTags | false | boolean | false - skip hidden items | data-crop-hidden-tags

## How to use

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