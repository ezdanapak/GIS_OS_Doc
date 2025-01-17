# ცვლადები

# Key Features

You can try out this python codes by using the cloud-computing platforms below without having to install anything on your computer:

[![image](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://demo.leafmap.org/lab/index.html?path=notebooks/00_key_features.ipynb)
[![image](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/opengeos/leafmap/blob/master)
[![image](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/opengeos/leafmap/HEAD)

## Strings

A string is a sequence of letters, numbers, and punctuation marks - or commonly known as **text**

In Python you can create a string by typing letters between single or double quotation marks.


```python
city = 'San Francisco'
state = 'California'
print(city, state)
```

    San Francisco California
    


```python
print(city +' '+state)
```


    Failed to start the Kernel. 
    

    View Jupyter <a href='command:jupyter.viewOutput'>log</a> for further details.



```python
print(city + ',' + state)
```

    San Francisco,California
    

## Numbers

Python can handle several types of numbers, but the two most common are:

- **int**, which represents integer values like 100, and
- **float**, which represents numbers that have a fraction part, like 0.5



```python
population = 881549
latitude = 37.7739
longitude = -121.5687
```


```python
print(type(latitude))
```

    <class 'float'>
    


```python
print(type(latitude))
```

    <class 'float'>
    


```python
elevation_feet = 934
elevation_meters = elevation_feet * 0.3048
print(elevation_meters)
```

    284.6832
    


```python
area_sqmi = 46.89
density = population / area_sqmi
print(density)
```

    18800.362550650458
    

## Exercise

We have a variable named `distance_km` below with the value `4135` - indicating the straight-line distance between San Francisco and New York in Kilometers. Create another variable called `distance_mi` and store the distance value in miles.

- Hint1: 1 mile = 1.60934 kilometers

Add the code in the cell below and run it. The output should be 2569.37


```python
distance_km = 4135
distance_mi = distance_km / 1.60934
print(distance_mi)
# Remove this line and add code here
```

    2569.376266046951
    

----
