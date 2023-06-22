const Course = ({courses}) => {
    console.log("Course Component Works",courses);
    return (   
        <>
        {courses.map(course => 
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )}
        </>
    )
}

const Header = ({name}) => {
    console.log("Header Component Works",name);
    return (   
        <h1>{name}</h1>
    )
}

const Content = ({parts}) => {
    console.log("Parts Component Works",parts);
    return (    
        <>
            {parts.map(part =>
                <Part key={part.id} Part part={part}/>     
            )}
        </>
        
    )
}

const Part = ({part}) => {
    console.log("Parts Component Works",part);
    return (   
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

    const Total = ({parts}) => {
        console.log("Total Component Works",parts);
        const sum = parts.reduce((total, part) => {
            return total + part.exercises;
        }, 0);

        return (   
            <p><strong>Total of exercises {sum}s</strong></p>
        )
    }

export default Course 