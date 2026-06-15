function dwadwasd(){
firebase.database().ref('/').set(
    {
      dimasdivinedumplings: {
        orders: {
          Name: {
            Flavour: 'Yummy',
            Servings: 'A lot',
          }
        }
      }
    }
  )
}