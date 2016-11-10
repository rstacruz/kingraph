# Schema

- **[families](#family)**
  - [parents](#parents)
  - [children](#children)
  - [parents2](#parents2)
  - [children2](#children2)
  - [house](#house)
  - [families](#families)
- **[people](#person)**
  - [name](#name)
  - [fullname](#fullname)
  - [links](#links)
  - [class](#class)
- **[styles](#styles)**

## Family

> `families` (Family[])<br>
> `families[].families` (Family[])

A list of families. All properties in a Family are optional, but you have to define at least one.

```yaml
families:
- parents: [Homer, Marge]
  children: [Bart, Lisa, Maggie]
- parents: [Lisa, Milhouse]
  children: [Zia]
```

### parents

> `families[].parents` (String[])

A list of parents. This is a list of person ID's. See [Family](#family) for an example.

### children

> `families[].children` (String[])

A list of children. See [Family](#family) for an example.

### parents2

> `families[].parents2` (String[])

A list of parents. Use this to express non-typical lineage such as step-parents. See [Family](#family) for an example.

```yaml
# Cersei and Jaime are the biological parents.
# Robert is married to Cersei, and acts as the children's father.
- parents: [Cersei, Jaime]
  parents2: [Robert]
  children: [Myrcella, Joffrey]
```

### children2

> `families[].children2` (String[])

A list of children. Use this to express non-typical children such as illegitimate children or foster siblings. See [parents2](#parents2) for an example.


```yaml
# Jon is the adopted son of Ned and Catelyn.
- parents: [Ned, Catelyn]
  children: [Rob, Rickon, Arya, Sansa]
  children2: [Jon]
```

### house

> `families[].house` (String)

The name of the house. If given, then a box will be drawn around the family and the sub-families inside it.

```yaml
# The [Rob, Talisa] family will be placed inside House Stark.
- house: Stark
  parents: [Ned, Catelyn]
  children: [Rob, Rickon, Arya, Sansa]
  families:
    - parents: [Rob, Talisa]
```

### families

> `families[].families` (Family[])

You can nest families inside other families. See [house](#house) for an example.

## Person

> `people{}`

Defines metadata for a person. All parameters are optional.

```yaml
# Nope, he's not dead, he's just here as an example ;)
people:
  Ned:
    name: Ned
    fullname: Eddard Stark
    born: 1950
    died: 1966
    class: [deceased]
```

### name

A person's name. If not present, then the person's ID will be used by default.

### fullname

A person's full name. Will be displayed in gray text.

### links

An array of links. Use this to link to a person's Facebook account. If given, their names will be clickable.

### class

A list of classes for styles. These will be applied to nodes. See [styles](#styles) for more information.

## Styles

> `styles{}`

A key-value object with `class` names as keys, and their GraphViz attributes as values. Refer to Graphviz's [attributes documentation](http://graphviz.org/doc/info/attrs.html) for attributes.

```yml
people:
  Ned:
    class: [deceased]
styles:
  deceased:
    color: red
    penwidth: 0.25
```