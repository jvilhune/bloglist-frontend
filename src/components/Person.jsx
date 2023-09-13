const Person = ({ person, butfunction }) => {
  let testnum = person.id
  return (
    <p className='person'>
    {person.name} {person.number}
    <button onClick={() => butfunction(testnum)}>delete</button>
    </p> 
  )
}

export default Person