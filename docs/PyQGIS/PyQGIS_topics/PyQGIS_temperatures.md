## ტემპერატურების კონვერტაცია

ცელსიუსიდან ფარენჰაიტზე


#ცვლადით

temp_c = 17

temp_f = temp_c * 9 / 5 + 32

print(temp_f)

#62.6


#ციკლით სიაში 

templist_c = [17, 19, 24, 21, 16]

for temp_c in templist_c:

    temp_f = temp_c * 9 / 5 + 32

    print(temp_f)