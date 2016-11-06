# family-tree

> Plots family trees using JavaScript and Graphviz

A family tree plotter with a very simple syntax. It probably doesn't cover everything you need, but covers 90% of it for the sake of simplicity.

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

### Grouping people

To group people together, use `houses`. Each house can have `families` and `people`.

```diff
-families:
-  - parents: [Marge, Homer]
-    children: [Bart, Lisa, Maggie]
+houses:
+  Simpson:
+    families:
+      - parents: [Marge, Homer]
+        children: [Bart, Lisa, Maggie]
+  Bouvier:
+    families:
+      - parents: [Jacqueline, Clancy]
+        children: [Marge, Patty, Selma]
 people:
   Marge:
     fullname: Marjorie Bouvier Simpson
```

### Disambiguating

Now `Marge` belongs in 2 houses. To fix this, add a `people` collection under the house, and put `Marge` there.

```diff
 houses:
   Simpson:
     families:
       - parents: [Marge, Homer]
         children: [Bart, Lisa, Maggie]
+    people:
+      Marge:
+      fullname: Marjorie Bouvier Simpson
   Bouvier:
     families:
       - parents: [Jacqueline, Clancy]
         children: [Marge, Patty, Selma]
-people:
-  Marge:
-    fullname: Marjorie Bouvier Simpson
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

### Nested families

You can put `families` within families. There's no need to do this, but it can help untangle knots by containing mega-families in the same bounding box.

```yml
families:
  - parents: [Abe, Alice]
    children: [Bob, Brandon]
    families:
    - parents: [Bob, Cassie]
      children: [Dany]
    - parents: [Brandon, Carol]
      children: [Ethan]
```

### Nested houses

Houses can nest to make sub-houses. Sub-house boxes will be placed inside house boxes.

```yml
houses:
  Simpson:
    families:
      - parents: [Homer, Marge]
        children: [Bart, Lisa, Maggie]
    houses:
      Simpson-Van Houten:
        - parents: [Lisa, Milhouse]
          children: [Zia]
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
 
