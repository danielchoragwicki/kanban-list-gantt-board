import { generateId, findById, addItem, updateList, removeItem, truncate, reorder, move } from './helpers';

//generateId

test('generateIdFunctionIsString_ReturnTrue', () => {
    const id = generateId();
    const result = typeof id === 'string';

    expect(result).toBeTruthy();
})

test('generateIdFunctionIsNotString_ReturnFalse', () => {
    const id = generateId();
    const result = typeof id !== 'string';

    expect(result).toBeFalsy();
})

//findById

test('findByIdFunction_ReturnExpectedItemFromArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const expected = {id:2, name: 'two', lists: []}
    const result = findById(2, startBoards)

    expect(result).toEqual(expected)
})

//addItem

test('addItemAddThePasseItemToTheList_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []}
    ]
    const newItem = {id:3, name: 'three', lists: []}
    const expected = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const result = addItem(startBoards, newItem)

    expect(result).toEqual(expected)
})
   
test('addItemNotMutateTheExistingItemsList_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []}
    ]
    const newItem = {id:3, name: 'three', lists: []}
    const result = addItem(startBoards, newItem)
  
    expect(result).not.toBe(startBoards)
})

//updateList

test('updateTodoFunctionUpdateItemById_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const updatedBoards = {id:2, name: 'two', lists: ['test_list']}
    const expectedBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: ['test_list']},
        {id:3, name: 'three', lists: []}
    ]
    const result = updateList(startBoards, updatedBoards)

    expect(result).toEqual(expectedBoards)
})
  
test('updateTodoNotMutateTheOriginalArray_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const updatedBoards = {id:2, name: 'two', lists: ['test_list']}
    const result = updateList(startBoards, updatedBoards)

    expect(result).not.toBe(startBoards)
})
  

//removeItem

test('removeItemFunctionRemoveItemById_ReturnExpectedArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const targetId = 2;
    const expected = [
        {id:1, name: 'one', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const result = removeItem(startBoards, targetId)

    expect(result).toEqual(expected)
})
  
test('removeItemNotMutateTheExistingItemsList_ReturnNotMutateArray', () => {
    const startBoards = [
        {id:1, name: 'one', lists: []},
        {id:2, name: 'two', lists: []},
        {id:3, name: 'three', lists: []}
    ]
    const targetId = 2;
    const result = removeItem(startBoards, targetId);

    expect(result).not.toBe(startBoards);
})

//truncate

test('truncateFunctionCutString_ReturnExpectedString', () => {
    const startString = 'TestTest';
    const expected = 'TestTe';
    const limit = 6;
    const result = truncate(startString, limit);

    expect(result).toEqual(expected)
})

test('truncateFunctionAddAfterWordSigns_ReturnExpectedString', () => {
    const startString = 'TestTest';
    const expected = 'TestTe...';
    const limit = 6;
    const after = '...';
    const result = truncate(startString, limit, after);

    expect(result).toEqual(expected)
})

//reorder

test('reorderFunctionReorderList_ReturnExpectedArray', () => {
    const startLists = [
        {id:1, name: 'one', cards: []},
        {id:2, name: 'two', cards: []},
        {id:3, name: 'three', cards: []},
        {id:4, name: 'four', cards: []},
        {id:5, name: 'five', cards: []}
    ]
    const expected = [
        {id:1, name: 'one', cards: []},
        {id:2, name: 'two', cards: []},
        {id:4, name: 'four', cards: []},
        {id:5, name: 'five', cards: []},
        {id:3, name: 'three', cards: []}
    ]
    const startIndex = 2;
    const endIndex = 4;
    const result = reorder(startLists, startIndex, endIndex);

    expect(result).toEqual(expected)
})

test('reorderNotMutateTheExistingItemsList_ReturnNotMutateArray', () => {
    const startLists = [
        {id:1, name: 'one', cards: []},
        {id:2, name: 'two', cards: []},
        {id:3, name: 'three', cards: []},
        {id:4, name: 'four', cards: []},
        {id:5, name: 'five', cards: []}
    ]
    const startIndex = 2;
    const endIndex = 4;
    const result = reorder(startLists, startIndex, endIndex);

    expect(result).not.toBe(startLists);
})

//move

test('moverFunctionMoveElementToAnotherList_ReturnExpectedObjectList', () => {
    const source = [
        {id:1, name: 'one', cards: []},
        {id:2, name: 'two', cards: []},
        {id:3, name: 'three', cards: []},
        {id:4, name: 'four', cards: []},
        {id:5, name: 'five', cards: []}
    ]
    const droppableSource = {
        droppableId: 'source',
        id: 1,
    }
    const destination = [
        {id:6, name: 'six', cards: []},
        {id:7, name: 'seven', cards: []},
        {id:8, name: 'eight', cards: []},
        {id:9, name: 'nine', cards: []},
        {id:10, name: 'ten', cards: []}
    ]
    const droppableDestination = {
        droppableId: 'destination',
        id: 2,
    }
    const expected = {
        source: [
            {id:2, name: 'two', cards: []},
            {id:3, name: 'three', cards: []},
            {id:4, name: 'four', cards: []},
            {id:5, name: 'five', cards: []}
        ],
        destination: [
            {id:1, name: 'one', cards: []},
            {id:6, name: 'six', cards: []},
            {id:7, name: 'seven', cards: []},
            {id:8, name: 'eight', cards: []},
            {id:9, name: 'nine', cards: []},
            {id:10, name: 'ten', cards: []}
        ]
    }
    const result = move(source, destination, droppableSource, droppableDestination);

    expect(result).toEqual(expected)
})