
class slt {
    public static void main(String[] args) {
        System.out.println(check_triqui(new Character[][] {
                { 'X', 'X', 'O' },
                { 'O', 'X', 'X' },
                { 'O', 'O', 'O' },
        }));

    }

    public static String check_triqui(Character[][] game) {

        String winner = "";

        for (int i = 0; i < game.length; i++) {
            String row = game[i][0].toString() + game[i][1].toString() + game[i][2].toString();
            String col = game[0][i].toString() + game[1][i].toString() + game[2][i].toString();
            String diag = game[0][0].toString() + game[1][1].toString() + game[2][2].toString();

            if (diag.equals("XXX") || diag.equals("OOO")) {
                winner = String.valueOf(diag.charAt(0));
                break;
            }
            if (row.equals("XXX") || row.equals("OOO")) {
                winner = String.valueOf(row.charAt(0));
                break;
            }

            if (col.equals("XXX") || col.equals("OOO")) {
                winner = String.valueOf(col.charAt(0));
                break;
            }

        }

        // se verifican las cantidades de jugadas de cada jugador
        int cant_x = 0;
        int cant_o = 0;

        for (int i = 0; i < game.length; i++) {
            for (int j = 0; j < game.length; j++) {
                if (String.valueOf(game[i][j]).equals("X")) {
                    cant_x++;
                }
                if (String.valueOf(game[i][j]).equals("O")) {
                    cant_o++;
                }
            }
        }
        if (winner.equals("X") && cant_o == cant_x - 1) {
            return "X";

        }
        if (winner.equals("O") && cant_x == cant_o - 1) {
            return "O";

        }
        if (winner.isEmpty() && (cant_o == cant_x - 1 || cant_x == cant_o - 1)) {
            return "empate";
        }
        return null;
    }
}
