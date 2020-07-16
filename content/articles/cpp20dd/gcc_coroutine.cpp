
#include <coroutine>
#include <exception>
#include <iterator>
#include <iostream>

template<class T, class G>
struct generator_iterator {
    typedef std::input_iterator_tag iterator_category;
    typedef ptrdiff_t difference_type;
    typedef T value_type;
    typedef value_type* pointer;
    typedef value_type& reference;
    typedef typename G::handle handle;
    handle coro;

    generator_iterator(nullptr_t): coro(nullptr) {}

    generator_iterator(handle coro): coro(coro) {}

    generator_iterator operator++() {
        if (coro.done()) {
            coro = nullptr;
        } else {
            coro.resume();
        }
        return *this;
    }

    void operator++(int) {
        ++*this;
    }

    reference operator*() {
        return this->coro.promise().current_value;
    }

    bool operator==(generator_iterator const& right) const {
        return coro == right.coro;
    }

    bool operator!=(generator_iterator const& right) const {
        return !(*this == right);
    }
};

template<class T>
struct generator {
  struct promise_type;
  using handle = std::coroutine_handle<promise_type>;
  typedef generator_iterator<T, generator> iterator;
  struct promise_type {
    T current_value;
    static auto get_return_object_on_allocation_failure() { return generator{nullptr}; }
    auto get_return_object() { return generator{handle::from_promise(*this)}; }
    auto initial_suspend() { return std::suspend_always{}; }
    auto final_suspend() { return std::suspend_always{}; }
    void unhandled_exception() { std::terminate(); }
    void return_void() {}
    auto yield_value(T value) {
      current_value = value;
      return std::suspend_always{};
    }
  };

  iterator begin() {
    if (coro) {
      coro.resume();
      if (coro.done()) {
        return { nullptr };
      }
    }
    return { coro };
  }

  iterator end() {
    return { nullptr };
  }
  generator(generator const&) = delete;
  generator(generator && rhs) : coro(rhs.coro) { rhs.coro = nullptr; }
  ~generator() { if (coro) coro.destroy(); }
private:
  generator(handle h) : coro(h) {}
  handle coro;
};

generator<int> f(int max = 10) { 
    for (int x = 0; x < max; ++x) {
        co_yield x * x;
    }
 }

int main() {
    for (auto&& i : f()) {
        std::cout << i << std::endl;
    }
}