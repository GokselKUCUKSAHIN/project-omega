package com.omega.json;

public class S11
{

  private static final int X = 0;
  private static final int Y = 1;

  private final Point[] s11;

  private S11(Point[] s11)
  {
    this.s11 = s11;
  }

  public static S11 create(double[][] ds11)
  {
    Point[] pointArr = new Point[ds11.length];
    for (int i = 0; i < ds11.length; i++)
    {
      pointArr[i] = Point.create(ds11[i][X], ds11[i][Y]);
    }
    return create(pointArr);
  }

  public static S11 create(Point[] s11)
  {
    return new S11(s11);
  }

  @Override
  public String toString()
  {
    StringBuilder sb = new StringBuilder("[");
    for (int i = 0; i < s11.length - 1; i++)
      sb.append(s11[i] + ",");
    sb.append(s11[s11.length - 1] + "]");
    return sb.toString();
  }
}
