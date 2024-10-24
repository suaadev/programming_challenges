/*
 * Crea una función que reciba un String de cualquier tipo y se encargue de
 * poner en mayúscula la primera letra de cada palabra.
 * - No se pueden utilizar operaciones del lenguaje que
 *   lo resuelvan directamente.
 */

class solution {
    public static void main(String[] args) {
        System.out.println(
                capitalize_word(
                        "Ordenamiento Radix es un algoritmo de ordenación no comparativo. Este algoritmo evita las comparaciones insertando elementos en cubos de acuerdo con el radix (Radix/Base es el número de dígitos únicos utilizados para representar números. Por ejemplo, los números decimales tienen diez dígitos únicos)"));
    }

    public static String capitalize_word(String str) {
        String str_out = "";
        str_out += String.valueOf(str.charAt(0)).toUpperCase();
        for (int i = 1; i < str.length(); i++) {
            if (str.charAt(i - 1) == ' ') {
                str_out += String.valueOf(str.charAt(i)).toUpperCase();
            } else {
                str_out += str.charAt(i);
            }
        }
        return str_out;
    }

}
