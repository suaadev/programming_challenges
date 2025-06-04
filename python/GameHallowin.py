from pynput.keyboard import Listener
from pynput import keyboard
from os import system


class GameHalloween:
    def __init__(self) -> None:
        self.map = [
            "🚪🔲🔲🔲",
            "🔲👻🔲🔲",
            "🔲🔲🔲👻",
            "🔲🔲🍭🔲"
        ]
        self.current_position = [3, 1]
        self.printMap()

        with Listener(on_press=self.onpress) as self.listener:
            self.listener.join()

    def onpress(self, key):
        if str(key) == "'w'":
            self.current_position[1] -= 1

        if str(key) == "'s'":
            self.current_position[1] += 1

        if str(key) == "'a'":
            self.current_position[0] -= 1

        if str(key) == "'d'":
            self.current_position[0] += 1
        self.questions()
        
        self.printMap()

    def questions(self):
        #TODO 
        pass

    def printMap(self):
        system('cls')
        position = self.current_position
        current_game_copy = self.map.copy()
        row = current_game_copy[position[1]]
        new_row = row[0:position[0]] + "🧛" + row[position[0]+1:]
        current_game_copy[position[1]] = new_row
        for i in current_game_copy:
            print(i)


game = GameHalloween()
game.printMap()
