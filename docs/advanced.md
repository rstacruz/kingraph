# Advanced

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

