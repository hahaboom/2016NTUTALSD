package certification;

import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Point;
import java.awt.geom.Rectangle2D;

public class TemplateCertificationMaker {
	private int lineSpace_=120;
	
	
	private int getStringWidth(Graphics imageGraphic, Font font, String text) {
		FontMetrics fontMetrics = imageGraphic.getFontMetrics(font);
		Rectangle2D rect = fontMetrics.getStringBounds(text, imageGraphic);
		return (int) Math.round(rect.getWidth());
	}
	
	private void makeFirstLine(Image img, TemplateCertification template,Certification certification)
	{
		Graphics2D graphics = (Graphics2D) img.getGraphics();
		int ownerWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getOwnerTextSize()), certification.getOwner());
		int dateWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getCourceDateTextSize()), certification.getCourceDate());
		int participateWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getParticipateSize()),	"參加");
		int firstLineWidth = ownerWidth + dateWidth + participateWidth;

		template.setIdLocation(new Point(1340, 225));
		template.setOwnerLocation(new Point((img.getWidth(null) - firstLineWidth) / 2, 370));
		template.setCourceDateLocation(new Point((img.getWidth(null) - firstLineWidth) / 2 + ownerWidth, 375));
		template.setParticipateLocation(new Point((img.getWidth(null) - firstLineWidth) / 2 + ownerWidth + dateWidth, 375));
		graphics.dispose();
	}
	
	private void makeSecondLine(Image img, TemplateCertification template,Certification certification)
	{
		Graphics2D graphics = (Graphics2D) img.getGraphics();
		int breakIndex=certification.getCourceName().indexOf("：");
		if(breakIndex==-1)
		{
			lineSpace_*=1.5;
			int courceNameWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getCourceNameTextSize()), certification.getCourceName());
			int y=(int) (template.getCourceDateLocation().getY()+lineSpace_);
			template.setCourceNameLocation1(new Point((img.getWidth(null) - courceNameWidth) / 2,y));
		}
		else
		{
			String forward=certification.getCourceName().substring(0, breakIndex+1);
			String backward=certification.getCourceName().substring(breakIndex+1, certification.getCourceName().length());
			int forwardWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getCourceNameTextSize()), forward);
			int backwardWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getCourceNameTextSize()), backward);
			int y1=(int) (template.getCourceDateLocation().getY()+lineSpace_);
			template.setCourceNameLocation1(new Point((img.getWidth(null) - forwardWidth) / 2,y1));
			int y2=(int) (template.getCourceNameLocation1().getY()+lineSpace_);
			template.setCourceNameLocation2(new Point((img.getWidth(null) - backwardWidth) / 2, y2));
		}
		graphics.dispose();
	}
	
	private void makeThirdLine(Image img, TemplateCertification template,Certification certification)
	{
		Graphics2D graphics = (Graphics2D) img.getGraphics();
		int courceDurationWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getCourceDurationSize()), certification.getCourceDuration());
		int y=(int) (Math.max(template.getCourceNameLocation1().getY(), template.getCourceNameLocation2().getY())+lineSpace_);
		template.setCourceDurationLocation(new Point((img.getWidth(null) - courceDurationWidth) / 2, y));
		graphics.dispose();
	}
	
	private void makeFourthLine(Image img, TemplateCertification template,Certification certification)
	{
		Graphics2D graphics = (Graphics2D) img.getGraphics();
		int dateWidth = getStringWidth(graphics, new Font("DFKai-SB", Font.PLAIN, template.getDateTextSize()), certification.getDate());
		template.setDateLocation(new Point((img.getWidth(null) - dateWidth) / 2, 1100));
		graphics.dispose();
	}
	
	public TemplateCertificationMaker() {
	}

	public TemplateCertification MakeTemplateCertification(Image img, Certification certification) {
		TemplateCertification template = new TemplateCertification();
		template.setIdTextSize(25);
		template.setOwnerTextSize(65);
		template.setCourceDateTextSize(50);
		template.setCourceNameTextSize(75);
		template.setParticipateSize(55);
		template.setCourceDurationSize(50);
		template.setDateTextSize(50);

		makeFirstLine(img, template, certification);
		makeSecondLine(img, template, certification);
		makeThirdLine(img, template, certification);
		makeFourthLine(img, template, certification);
		return template;
	}
}
