class PartidoTenis {
    static final String P1 = "P1";
    static final String P2 = "P2";
    static final String[] POINTS = { "love", "15", "30", "40", "ad" };
    static int p1_i = 0;
    static int p2_i = 0;
    static String winner = null;

    public static void main(String[] args) {
        String[] input = { P1, P2, P1, P1, P2, P1, P1 };
        narrate(input);
    }

    public static void narrate(String[] partido) {
        for (String player : partido) {
            pointPlayer(player);
            String output = null;

            if (winner != null) {
                System.out.println("The winner is " + winner);
                break;
            } else if (p1_i == p2_i) {
                output = "Deuse";
            } else if (POINTS[p1_i].equals(POINTS[4]) || POINTS[p2_i].equals(POINTS[4])) {
                output = "Ventaja " + ((POINTS[p1_i].equals(POINTS[4])) ? P1 : P2);
            }

            System.out.println((output != null) ? output : POINTS[p1_i] + " - " + POINTS[p2_i]);
        }
    }

    public static void pointPlayer(String player) {
        if (player == P1) {
            p1_i += 1;
        } else {
            p2_i += 1;
        }
        if (p1_i > 4 || p2_i > 4) {
            winner = (p1_i > 4) ? P1 : P2;
        }
    }
}