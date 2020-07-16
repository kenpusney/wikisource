#include <ranges>
#include <span>
#include <iostream>
#include <array>

using namespace std::views;

int main() {

    auto s = iota(1, 10);

    std::invocable<int> auto even = [](int x) -> bool {
        return x % 2 == 0;
    };

    std::invocable<int> auto square = [](int x) -> int {
        return x * x;
    };

    for (auto&& e: s | transform(square) | reverse) {
        std::cout << e << std::endl;
    }
}