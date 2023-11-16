const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNodes = listNode.querySelectorAll("student");

const students = [];
studentNodes.forEach((studentNode) => {
    const ageNode = studentNode.querySelector("age");
    const profNode = studentNode.querySelector("prof");
    const nameNode = studentNode.querySelector("name");
    const firstNode = nameNode.querySelector("first");
    const secondNode = nameNode.querySelector("second");
    const langAttr = nameNode.getAttribute('lang');

    const name = firstNode.textContent + ' ' + secondNode.textContent;
    
    const result = {
        name: name,
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
        lang: langAttr,
    };

    students.push(result)
})

const jsonList = {
    list: students
}

console.log(jsonList)