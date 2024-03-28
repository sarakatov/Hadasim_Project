import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        Scanner in=new Scanner(System.in);
        int isContinue=0;
        double height=0,width=0;
        while(isContinue!=3) {
            System.out.println("Enter 1 for a rectangle tower");
            System.out.println("enter 2 for a triangle tower");
            System.out.println("enter 3 to exit");
            isContinue = in.nextInt();
            if (isContinue == 1 || isContinue == 2) {
                System.out.println("Enter tower height:");
                height =  in.nextDouble();
                while (height < 2) {
                    System.out.println("Incorrect height, enter again (less than 2):");
                    height = in.nextDouble();
                }
                System.out.println("Enter tower width:");
                width = in.nextDouble();
                while (width < 1) {
                    System.out.println("Incorrect width, enter again (less than 1):");
                    width = in.nextDouble();
                }
            }
                switch (isContinue) {
                    case 1:
                        RectangleTower rectangleTower = new RectangleTower(height, width);
                        if (height == width || height - width > 5||width-height>5)
                            System.out.println("Area of the rectangle: " + rectangleTower.calcArea() + "\n----------");
                        else
                            System.out.println("Scope of the rectangle: " + rectangleTower.calcScope() + "\n----------");
                        break;
                    case 2:
                        TriangularTower triangularTower = new TriangularTower(height, width);
                        System.out.println("Enter 1 to calculate the perimeter of the triangle\nEnter 2 to print the triangle");
                        int answer = in.nextInt();
                        while (answer != 1 && answer != 2) {
                            System.out.println("Enter 1 to calculate the perimeter of the triangle\nEnter 2 to print the triangle");
                            answer = in.nextInt();
                        }
                        if (answer == 1)
                            System.out.println("Scope of the triangle:  " + triangularTower.calcScope() + "\n----------");
                        else
                            System.out.println(triangularTower.trianglePrint());
                        break;
                    case 3:
                        System.out.println("Hope you enjoy :)");
                        break;
                    default:
                        System.out.println("Invalid value" + "\n----------");
                        break;
                }
            }
    }
}
