# family-tree

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
