public class TriangularTower extends Tower {
    public TriangularTower(double height, double width) {
        super(height, width);
    }

    @Override
    public double calcScope() {
        double result=Math.pow(getWidth()/2,2)+Math.pow(getHeight(),2);
        result=getWidth() +((Math.sqrt(result))* 2);
        return result;
    }
    public String repeat(String character, int times) {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < times; i++) {
            str.append(character);
        }
        return str.toString();
    }
    public StringBuilder trianglePrint() {
        StringBuilder triangle = new StringBuilder();
        int height=(int)getHeight();
        int width= (int) getWidth();
        if(width%2==0||width>(height*2))
            return triangle.append("The triangle cannot be printed\n----------");
        int numLinesPerType,rest=0,cnt,numTypeLines;
        numTypeLines=(width-2)/2;
        if(numTypeLines==0) {
            cnt=1;
            numTypeLines=1;
            numLinesPerType = height-2;
        }
        else {
            numLinesPerType = (height - 2) / numTypeLines; //מספר שורות לכל סוג
            rest = (height- 2) % numTypeLines;
            cnt = 3;
        }
        triangle.append(repeat(" ",width/2)+"*\n");
        for (int i = 0; i < numTypeLines; i++) {
            if (i == 0) {
                numLinesPerType += rest;
            }
            for (int j = 0; j < numLinesPerType; j++) {
                if (width==1)
                    triangle.append(repeat("*", cnt) + "\n");
                else
                    triangle.append(repeat(" ", numTypeLines - i) + repeat("*", cnt) + "\n");
                if (i == 0 && j == numLinesPerType - 1)
                    numLinesPerType -= rest;
            }
            cnt += 2;
        }
        triangle.append(repeat("*",width));
        return triangle;
    }

}
