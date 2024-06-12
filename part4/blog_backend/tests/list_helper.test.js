const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})


const total = require('../utils/list_helper').total

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f80',
      title: 'Go To Statement',
      author: 'Edsger W. Dijk',
      url: 'https://homepages.cwi.',
      likes: 10,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is correct', () => {
    const result = totalLikes(listWithTwoBlogs)
    assert.strictEqual(result, 15)
  })
})

test('favorite blog is Go To Statement', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f80',
      title: 'Go To Statement',
      author: 'Edsger W. Dijk',
      url: 'https://homepages.cwi.',
      likes: 10,
      __v: 0
    }
  ]

  const result = favoriteBlog(listWithTwoBlogs)
  assert.deepStrictEqual(result, 
    {
      _id: '5a422aa71b54a676234d17f80',
      title: 'Go To Statement',
      author: 'Edsger W. Dijk',
      url: 'https://homepages.cwi.',
      likes: 10,
      __v: 0
    })
})