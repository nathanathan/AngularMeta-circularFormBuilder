Angular Meta-circular Form Builder
==================================

A meta-circular form builder is a form builder that can build itself.

In the demo, the data of form A defines the schema of form B and vice versa.

#### Notes

There are a few different ways to reactively handle schema name changes.
In one way of thinking about it, when a value is entered in a field it is bound
not to the field but to the field's name in a data model.
Consequently, renaming the field will cause the value to disappear, and giving
another field the same name will cause the value to appear there.
The other approach is to view the field value as being bound to a field entity
so the value will stay when the field's name is changed.
The code in this repo implements the former approach,
but I've experimented with the later in this jsfiddle: http://jsfiddle.net/YF57A/7/
