/*
 * Crea una función que evalúe si un/a atleta ha superado correctamente una
 * carrera de obstáculos.
 * - La función recibirá dos parámetros:
 *      - Un array que sólo puede contener String con las palabras
 *        "run" o "jump"
 *      - Un String que represente la pista y sólo puede contener "_" (suelo)
 *        o "|" (valla)
 * - La función imprimirá cómo ha finalizado la carrera:
 *      - Si el/a atleta hace "run" en "_" (suelo) y "jump" en "|" (valla)
 *        será correcto y no variará el símbolo de esa parte de la pista.
 *      - Si hace "jump" en "_" (suelo), se variará la pista por "x".
 *      - Si hace "run" en "|" (valla), se variará la pista por "/".
 * - La función retornará un Boolean que indique si ha superado la carrera.
 * Para ello tiene que realizar la opción correcta en cada tramo de la pista.
 */

enum Action {
    run, jump
}

class solution_race {
    public static void main(String[] args) {

        System.out.println(checkRace(
                new String[] { "run", "run", "jump", "run", "jump", "run", "jump", "run", "jump", "jump", "run" },
                "__|_|_|_||_"));
    }

    public static boolean checkRace(String[] actions, String track) {
        String raceFinale = "";
        for (int i = 0; i < actions.length; i++) {
            if (actions[i].equals(Action.run.toString()) && track.charAt(i) != '_') {
                raceFinale += "x";
                continue;
            }

            if (actions[i].equals(Action.jump.toString()) && track.charAt(i) != '|') {
                raceFinale += "/";
                continue;
            }
            raceFinale += track.charAt(i);
        }

        System.out.println(raceFinale);
        return raceFinale.equals(track);
    }
}
