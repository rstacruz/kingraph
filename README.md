# family-tree

> Plots family trees using JavaScript and Graphviz

A family tree plotter with a very simple syntax. It probably doesn't cover everything you need, but covers 90% of it for the sake of simplicity.

![](docs/images/example.png)

Usage
-----

```
family-tree family.yml > family.svg
```

Getting started
---------------

Let's start with `families`. Every family can have `parents` and `children`.

```diff
+families:
+  - parents: [Marge, Homer]
+    children: [Bart, Lisa, Maggie]
```

### Defining names

To define their full names, add a `people` collection. This is optional—people will still be in the family tree even if they don't have a `people` record.

```diff
 families:
   - parents: [Marge, Homer]
     children: [Bart, Lisa, Maggie]
+people:
+  Marge:
+    fullname: Marjorie Bouvier Simpson
```

### Second generations

To create second generations, you can simply add another `Family` record.

```diff
 families:
   - parents: [Marge, Homer]
     children: [Bart, Lisa, Maggie]
+  - parents: [Lisa, Milhouse]
+    children: [Zia]
```

Preferably, you can make them a sub-family. This can help untangle things.

<details>
<summary>Why nest?<summary>

Nesting families is more of a visual designation rather than a semantic one.
</details>

```diff
 families:
   - parents: [Marge, Homer]
     children: [Bart, Lisa, Maggie]
+    families:
+      - parents: [Lisa, Milhouse]
+        children: [Zia]
```

### Houses

Turn a family into a house by adding a `house` name. They will show up grouped in a box.

```diff
families:
  - house: Stark
    parents: [Ned, Catelyn]
    children: [Arya, Rickon, Bran, Sansa, Rob]
  - house: Lannister
    parents: [Tywin, Joanna]
    children: [Cersei, Jaime, Tyrion]
```

More features
-------------

This is the part of the API that will help deal with bigger trees.

### Complex families

To express complex families, you can use `parents2` and `children2`. They will be drawn as dotted lines. Use this to express a different link, such as foster children or step parents.

```yml
families:
  - parents: [Ned, Catelyn]
    children: [Arya, Rickon, Bran, Sansa, Rob]
    children2: [Jon]
```

## Styling

Use `class` and `style` to style. Refer to Graphviz'z [attributes documentation](http://graphviz.org/doc/info/attrs.html) for possible attributes.

```yml
people:
  James:
    fullname: James Potter
    class: [deceased]
styles:
  deceased:
    color: red
```
 
