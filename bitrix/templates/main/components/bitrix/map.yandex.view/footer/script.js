if (!window.BX_YMapAddPlacemark)
{
	window.BX_YMapAddPlacemark = function(map, arPlacemark)
	{
		if (null == map)
			return false;

		if(!arPlacemark.LAT || !arPlacemark.LON)
			return false;

		var props = {};
		if (null != arPlacemark.TEXT && arPlacemark.TEXT.length > 0)
		{
			var value_view = '';

			if (arPlacemark.TEXT.length > 0)
			{
				var rnpos = arPlacemark.TEXT.indexOf("\n");
				value_view = rnpos <= 0 ? arPlacemark.TEXT : arPlacemark.TEXT.substring(0, rnpos);
			}

			props.balloonContent = arPlacemark.TEXT.replace(/\n/g, '<br />');
			props.hintContent = value_view;
		}

		var obPlacemark = new ymaps.Placemark(
			[arPlacemark.LAT, arPlacemark.LON],
			props,
			{balloonCloseButton: false,
			iconImageHref: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM1LjIxOSAzNS4yMTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM1LjIxOSAzNS4yMTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZD0iTTE3LjYxMiwwQzExLjAwNSwwLDUuNjQ4LDUuMzIxLDUuNjQ4LDExLjg4NWMwLDMuMzU4LDMuMjk0LDkuMzc0LDMuMjk0LDkuMzc0bDguMjI5LDEzLjk2bDguNTg2LTEzLjc5NyAgIGMwLDAsMy44MTQtNS43NCwzLjgxNC05LjUzN0MyOS41NzIsNS4zMjEsMjQuMjE2LDAsMTcuNjEyLDB6IE0xNy41NTYsMTguNDMxYy0zLjc4NCwwLTYuODQ5LTMuMDY1LTYuODQ5LTYuODUzICAgYzAtMy43ODMsMy4wNjQtNi44NDYsNi44NDktNi44NDZjMy43ODIsMCw2Ljg1LDMuMDYzLDYuODUsNi44NDZDMjQuNDA2LDE1LjM2NiwyMS4zMzgsMTguNDMxLDE3LjU1NiwxOC40MzF6IiBmaWxsPSIjNWJhYTAwIi8+PC9zdmc+',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -40]}
		);

		map.geoObjects.add(obPlacemark);

		return obPlacemark;
	}
}

if (!window.BX_YMapAddPolyline)
{
	window.BX_YMapAddPolyline = function(map, arPolyline)
	{
		if (null == map)
			return false;

		if (null != arPolyline.POINTS && arPolyline.POINTS.length > 1)
		{
			var arPoints = [];
			for (var i = 0, len = arPolyline.POINTS.length; i < len; i++)
			{
				arPoints.push([arPolyline.POINTS[i].LAT, arPolyline.POINTS[i].LON]);
			}
		}
		else
		{
			return false;
		}

		var obParams = {clickable: true};
		if (null != arPolyline.STYLE)
		{
			obParams.strokeColor = arPolyline.STYLE.strokeColor;
			obParams.strokeWidth = arPolyline.STYLE.strokeWidth;
		}
		var obPolyline = new ymaps.Polyline(
			arPoints, {balloonContent: arPolyline.TITLE}, obParams
		);

		map.geoObjects.add(obPolyline);

		return obPolyline;
	}
}