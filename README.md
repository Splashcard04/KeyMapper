# KeyMapper
Welcome to KeyMapper!  This tool offers many utilites for creating BeatSaber modcharts as well as compresses code to make it shorter and asdter.

**Normal (JS Template) Way**
```js
diff.customData.environment.push(
   {
      "id": "Sun$"
      "lookupMethod": "Regex"
      "duplicate": 1,
      "position": [
         40, 50, 100
      ]
      "components": {
         "ILightWithId": {
            "lightID": 100
         }
      }
   }
)
```
**KeyMapper Way**
```ts
new EnvironmentBuilder("Sun$", "Regex")
.duplicate(1)
.position([40, 50, 100])
.lightID(100)
.push()
```
KeyMapper also includes classes for models as well as objects (Notes, Walls, ect.), lightEvents, Environment/Geometry and much more.

#### Head over to the [wiki](https://github.com/Splashcard04/TSMap/wiki) to get started
