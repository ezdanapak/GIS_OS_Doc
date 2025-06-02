##  მონაცემთა სტრუქტურები



### წყვილები - Tuples

წყვილები ეს არის ობიექტების მიმდევრობა, შიგთავსი შესაძლებელია იყოს ნებისმიერი <br>
რიცხვების რაოდენობა. წყვილები იწერება მრგვალ ფრჩხილებში **()**. 
   
```py title="Tumpes" linenums="1"
latitude =  42.289449
longitude =  43.284585
altitude = 500
coordinates = (latitude, longitude, altitude)
print(coordinates)

#პრინტ ფუნქცია დაბეჭდავს > (42.289449, 43.284585, 500)
```
თითოეულ მათგანი წვდომადია პოზიციით "ინდექსით" . <br>
პროგრამირებაში თვლა იწყება 0 - დან. ანუ პირველი ობიექტის ინდექსი იქნება 0, შემდეგის 1 და ა.შ <br>
ინდექსი უნდა იყოს ოთხკუთხედ ფრჩხილებში **[]**.

```py title="Tumpes" linenums="1"

y = coordinates[0]
x = coordinates[1]
print(x, y)
print(coordinates[1])

#პირველი პრინტ ფუნქცია დაბეჭდავს ამ ხაზიდან 
#coordinates = (latitude, longitude, altitude)
# X და Y - ს > 43.284585 42.289449 
#მეორე პრინტ ფუნქცია დაბეჭდავს ამავე ხაზიდან ინდექსით პირველს > 43.284585
```

### სიები - Lists


A **list** is similar to a tuple - but with a key difference. With tuples, once created, they cannot be changed, i.e. they are immutable. But lists are mutable. You can add, delete or change elements within a list.  In Python, lists are written with square brackets **[]**

```py title="Tumpes" linenums="1"

cities = ['Chiatura', 'Zestafoni', 'Kutaisi', 'Samtredia']
print(cities)

#პრინტ ფუნქცია დაბეჭდავს > ['Chiatura', 'Zestafoni', 'Kutaisi', 'Samtredia']
```

შესაძლებელია 