const eventsMap = require("../mocks/events");
const people = require("../mocks/people");
//для проверки фильтра можно вписать
//allEvents(filter: "VOXXED")
const resolvers = {
  Query: {
    allEvents: (_, { filter }) => {
      return makeAsync(
        filter
          ? Object.values(eventsMap).filter((event) =>
              event.title.includes(filter)
            )
          : Object.values(eventsMap)
      );
    },
    event: (_,{id}) => {
      return makeAsync(eventsMap[id])
    }
  },
  Mutation: {
    renameEvent: (_,{id, title}) => {
        eventsMap[id].title = title
        return makeAsync(eventsMap[id])
    }
  },
  //если запрашиваем id , то вернем это, т.к. иначе называется в моке
  Event: {
    id: (obj) => obj._id,
    //добавили поле people и тут эмулируем запрос в иное место за ними
    people: (obj) =>
      people.filter(
        (person) => obj.peopleIds && obj.peopleIds.includes(person._id)
      ),
  },
  Person: {
    id: (obj) => obj._id,
  },
};
function makeAsync(data, timeout = 1000) {
  return new Promise((resolve) => setTimeout(() => resolve(data), timeout));
}

module.exports = resolvers;
