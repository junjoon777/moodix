def hi(string):
    j = open(".txt", "r")
    d = j.readlines()
    newList = []
    for i in d:
        b = i.lower()
        c = b[0:len(b)-1]
        newList.append(c)        
    return newList

def ji(string):
    newlist = []
    for i in string:
        if " " not in i:
            newlist.append(i)
    return newlist

def hey(filename):
    a = open(filename, "r")
    b = a.readlines()
    newlist = []
    for item in b:
        d = item.split(": :")
        if d[0] not in [" \n", "\n"]:
            newlist.append(d[0])
    return newlist

def confuse(filename):
    a = open(filename, "r")
    b = a.readlines()
    newList = []
    for each in range(0, len(b), 3):
        newList.append(b[each])
        
    return newList

def split(lis):
    newlis = []
    for i in lis:
        a = i.split(" ")
        newlis.append(a[0])
    return newlis

# data
def anger(filename):
    a = open(filename, "r")
    b = a.readlines()
    newlist = []
    for i in b:
        new = ""
        for j in i:
            if j not in "123456789":
                new += j
        newlist.append(new)      
    return newlist

def anger1(b):
    newlist = []
    for i in b:
        c = i.split("\t0")
        newlist.append(c[0])
    return newlist


    

        
