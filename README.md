<h1>Smart Crop Text Plugin</h1>

<p>Обрезает текст до определенной длины сохраняя при этом его HTML оформление. То есть, Вы с легкостью можете обрезать контент имеющий ссылки, списки и даже таблицы.</p>
</br>

<h2>API Plugin</h2>

<table>
	<thead>
		<tr>
			<td>Название</td>
			<td>По-умолчанию</td>
			<td>Описание</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>length</td>
			<td>200</td>
			<td>Длина до которой необходимо выполнить обрезку</td>
		</tr>
		<tr>
			<td>more</td>
			<td>Показать еще</td>
			<td>Текст кнопки, показывающий полный текст</td>
		</tr>
		<tr>
			<td>less</td>
			<td>Скрыть</td>
			<td>Текст кнопки, показывающий только обрезанный текст</td>
		</tr>
		<tr>
			<td>ending</td>
			<td>...</td>
			<td>Окончание добавляемое к обрезанному тексту</td>
		</tr>
		<tr>
			<td>html</td>
			<td>true</td>
			<td>Сохраняет HTML оформление текста</td>
		</tr>
	</tbody>
</table>
</br>

<h2>Use Plugin</h2>

<p>Использование в javaScript:</p>

<pre>
<code>
	$('.content').smartCropText({
		length: 250,
		more: 'Подробнее'
	});
</code>
</pre>

<p>Использование через data-атрибуты:</p>

<pre>
<code>
	&lt;div class="content" data-plugin="sct" data-length="50"&gt;
		&lt;strong&gt;Lorem Ipsum&lt;/strong&gt; - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.
	&lt;/div&gt;
</code>
</pre>

</br>
<p>Замечания и предложения направляйте на <a href="mailto:smart-jquery@mail.ru">smart-jquery@mail.ru</a></p>
