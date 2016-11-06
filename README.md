# family-tree

> Plots family trees using JavaScript and Graphviz

A family tree plotter with a very simple syntax. It probably doesn't cover everything you need, but covers 90% of it for the sake of simplicity.

## Usage

It produces a [Graphviz digraph](http://www.graphviz.org/content/dot-language), so use it with dot.

```
family-tree family.yml | dot -Tsvg > family.svg
```

## Writing a family tree

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

## More features

### Complex families

To express complex families, you can use `parents2` and `children2`. They will be drawn as dotted lines. Use this to express a different link, such as foster children or step parents.

```yml
families:
  - parents: [Ned, Catelyn]
    children: [Arya, Rickon, Bran, Sansa, Rob]
    children2: [Jon]
```

### Styling

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
