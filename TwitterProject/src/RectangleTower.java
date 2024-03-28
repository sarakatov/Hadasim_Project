public class RectangleTower extends Tower {
    public RectangleTower(double height, double width) {
        super(height, width);
    }

    @Override
    public double calcScope() {
        return (getHeight()+getWidth())*2;
    }
    public double calcArea(){
        return getHeight()*getWidth();
    }



}
