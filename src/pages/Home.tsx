import logoImg from "@/img/logo.png";
import heroImg from "@/img/soleil.JPG";
import feilleImg from "@/img/feille.jpg";
import natureRivierFeille from "@/img/natureRivierFeille.jpg";
import rivierCaillou from "@/img/rivierCaillou.jpg";
import allone from "@/img/allone.jpg";
import imgfooter from "@/img/imgfooter.png";
import room from "@/img/room.jpg";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion"; // הוספת אנימציות
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Heart, 
  Shield, 
  Sparkles, 
  Eye,
  HandHeart,
  Lightbulb,
  Clock,
  CheckCircle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";

const heroImage = heroImg;
const feature1 = allone
const feature2 = room
const feature3 = feilleImg;
const benefitsImage = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/benefits/benefits-main-6e2dc194ebb240ba8cff811ab91c96fb.png";
const testimonial1 = natureRivierFeille
const testimonial2 = rivierCaillou
const ctaImage = imgfooter;

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון לא תקין"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "הפנייה נשלחה בהצלחה!",
        description: "נחזור אליך תוך 24-48 שעות.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסי שוב מאוחר יותר.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const faqItems = [
    {
      question: "כמה זמן לוקח התהליך?",
      answer: "התהליך מותאם אישית לכל אישה. יש נשים שמרגישות שינוי משמעותי כבר אחרי מספר מפגשים, ויש שצריכות תהליך ארוך יותר. בממוצע, רוב הנשים עוברות תהליך של 3-6 חודשים. הקצב נקבע לפי המוכנות הפנימית שלך ולא לפי לוח זמנים חיצוני."
    },
    {
      question: "האם התהליך מתאים לי אם אני עדיין בקשר?",
      answer: "כן, בהחלט. חלק מהנשים מגיעות כשהן עדיין בקשר אבל מרגישות שמשהו לא בסדר. התהליך עוזר לך להבין מה קורה, לבנות בהירות ולקבל החלטות מתוך מקום של כוח פנימי ולא מתוך פחד או בלבול."
    },
    {
      question: "האם הטיפול מתאים גם לנשים שלא בטוחות אם הקשר רעיל?",
      answer: "בהחלט. הרבה פעמים הספק הוא חלק מהדינמיקה של הקשר. בפגישה הראשונה נעזור לך לעשות סדר ולזהות אם יש דפוסים רעילים, בלי שום לחץ לקבל החלטות דרמטיות."
    },
    {
      question: "מה ההבדל בין הטיפול שלך לטיפול פסיכולוגי רגיל?",
      answer: "הגישה שלי משלבת הבנה פסיכולוגית עמוקה עם כלים מעשיים מעולמות האימון והNLP. זה לא רק הבנה של מה קרה, אלא גם בניית כלים קונקרטיים לחיים היומיומיים. בנוסף, יש דגש חזק על חיבור לגוף ולתחושות, ולא רק עבודה מנטלית."
    },
    {
      question: "איך אני יודעת שזה יעבוד בשבילי?",
      answer: "זו בדיוק המטרה של הפגישה הראשונה במחיר הסמלי. במפגש הזה את תרגישי אם יש התאמה, אם את מרגישה מובנת ובטוחה, ואם הגישה שלי מתאימה לך. אין התחייבות מראש - רק אחרי שאת מרגישה שזה המקום הנכון בשבילך."
    },
    {
      question: "מה אם אני לא מוכנה לוותר על הקשר לגמרי?",
      answer: "זה בסדר גמור. המטרה שלי היא לא לשכנע אותך לעזוב, אלא לעזור לך להבין מה באמת קורה ולקבל החלטות מתוך בהירות. יש נשים שמחליטות לעבוד על הקשר, ויש שמחליטות לעזוב. החשוב הוא שההחלטה תהיה שלך, מתוך מקום של כוח ולא מתוך פחד."
    },
    {
      question: "האם המפגשים מתקיימים פנים אל פנים או באינטרנט?",
      answer: "אני מציעה שתי אפשרויות - מפגשים פנים אל פנים במרכז הארץ ומפגשים בזום. שתי הצורות יעילות באותה מידה. הבחירה תלויה בנוחות שלך ובמיקום הגיאוגרפי."
    }
  ];

  return (
    <div className="min-h-screen selection:bg-primary/20 overflow-x-hidden w-full">
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <img src={logoImg} alt="Logo Loading" className="h-32 w-auto object-contain" />
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="אישה רגועה ומחוברת לעצמה"
            className="w-full h-full object-cover brightness-[0.4]"
            data-testid="img-hero"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <img 
              src={logoImg} 
              alt="חלי לב - לוגו" 
              className="h-28 md:h-40 w-auto object-contain drop-shadow-2xl mb-12"
              data-testid="img-logo-hero"
            />

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] text-white drop-shadow-lg" data-testid="text-hero-title">
              מקשר רעיל<br />
              <span className="text-primary">לחיים חופשיים</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white max-w-2xl leading-relaxed drop-shadow-md" data-testid="text-hero-subtitle">
              ליווי רגשי עדין ומעמיק לנשים שיוצאות מקשרים רעילים - לחזרה לעצמן, לביטחון פנימי ולשקט שמגיע להן
            </p>
            <p className="text-lg italic text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-sm border-r-2 border-primary/50 pr-4" data-testid="text-hero-testimonial">
              "הוא גרם לי להאמין שאני המשוגעת... לא ידעתי איך לצאת מזה"
              <br />
              <span className="text-base not-italic font-medium">זה בדיוק מה שאמרה לי מטופלת אחרי הפגישה הראשונה - במחיר סמלי</span>
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-cta"
              >
                קבעי פגישה ראשונה עכשיו
              </Button>
              <div>
                <p className="text-white font-semibold drop-shadow-md" data-testid="text-hero-offer">
                  פגישה ראשונה במחיר סמלי של 
                </p>
                <p className="text-white/80 text-sm drop-shadow-md">
                  49 ₪ בלבד 
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="py-24 bg-secondary/30" data-testid="section-treatment">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-treatment-title">
              הטיפול "<span className="text-primary">Toxic Free</span>"
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed" data-testid="text-treatment-subtitle">
              שילוב נדיר של חמלה רכה עם עמידה איתנה על עקרונות - הגישה הטיפולית שמחזירה לך את השליטה על חייך
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: feature1, icon: Eye, title: "זיהוי נקודות אדומות", text: "למידה לזהות מנגנוני שליטה ודפוסים רעילים שמופעלים עליך - כדי שלא תיפלי בהם שוב", testId: "card-feature-1" },
              { img: feature2, icon: HandHeart, title: "תמיכה רגשית מלאה", text: "מרחב בטוח ולא שיפוטי, מתוך ניסיון אישי ומקצועי עמוק - כאן לא צריך \"להיות חזקות\"", testId: "card-feature-2" },
              { img: feature3, icon: Sparkles, title: "שינוי פנימי מהותי", text: "תחושת מסוגלות ושינוי פנימי כבר מהמפגש הראשון - לא עוד שיחה רגילה אלא התחלה של חיים חדשים", testId: "card-feature-3" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="border-none shadow-xl shadow-foreground/5 bg-background hover:translate-y-[-8px] transition-all duration-300" data-testid={f.testId}>
                  <div className="aspect-[16/10] overflow-hidden rounded-t-[inherit]">
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <f.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">{f.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{f.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-24" data-testid="section-principles">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16" data-testid="text-principles-title">העקרונות המנחים אותי</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "אין בעיה באישה", text: "הייתה הסתגלות למציאות פוגעת - עכשיו לומדים דרך חדשה", testId: "card-principle-1" },
              { icon: Heart, title: "ריפוי בקשר", text: "לא בכוח או סיסמאות, אלא דרך חיבור מחדש לגוף ולרגש", testId: "card-principle-2" },
              { icon: Lightbulb, title: "הבנה + כלים", text: "עומק רגשי עם עבודה יומיומית שמחזירה שליטה", testId: "card-principle-3" },
              { icon: Clock, title: "הקצב שלך", text: "הקשבה אמיתית למוכנות הפנימית - בלי לחץ", testId: "card-principle-4" }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-colors text-center" 
                data-testid={p.testId}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <p.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold mb-3">{p.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary/20" data-testid="section-benefits">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <img 
                src={benefitsImage} 
                alt="אישה מאושרת וחופשית" 
                className="rounded-[2rem] shadow-2xl w-full relative z-10"
                data-testid="img-benefits"
              />
            </motion.div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight" data-testid="text-benefits-title">
                מה שנשים חוות<br />
                <span className="text-primary">במהלך הליווי</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { icon: Sparkles, title: "מבלבול לבהירות", text: "ירידה הדרגתית בעוצמת הכמיהה והבלבול, הבנה רגשית (לא רק שכלית) של מה קרה בקשר" },
                  { icon: Shield, title: "מתלות לעצמאות", text: "חיזוק ביטחון פנימי ויכולת בחירה, בניית גבולות רגשיים בריאים" },
                  { icon: Heart, title: "חזרה לעצמן", text: "חיבור מחדש לעצמן, לרצון ולחיים - שקט פנימי ויציבות רגשית" },
                  { icon: HandHeart, title: "פתיחת הלב מחדש", text: "יכולת לפתוח את הלב מחדש לקשר בריא - בלי לאבד את עצמן" }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start" 
                    data-testid={`benefit-item-${i+1}`}
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-2xl shadow-sm flex items-center justify-center">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{benefit.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-3xl flex flex-col items-center gap-6" data-testid="text-benefits-cta-box">
                <p className="text-center text-lg font-medium">
                  זה לא אימון של "תתגברי"<br />
                  <span className="text-primary font-bold text-2xl mt-2 block">זה תהליך של חזרה הביתה</span>
                </p>
                <Button 
                  className="rounded-full px-8 py-4 text-base shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  התחילי את המסע שלך עוד היום
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden" data-testid="section-testimonials">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-testimonials-title">נשים שבחרו לשחרר עצמן</h2>
            <p className="text-muted-foreground text-xl" data-testid="text-testimonials-subtitle">
              סיפורים אמיתיים של נשים שעברו את התהליך וחזרו לעצמן
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                name: "שרה מ.",
                role: "גרושה, אמא לשניים",
                img: testimonial1,
                quote: "אחרי 3 שנים של קשר רעיל, הגעתי לחלי מותשת לחלוטין. חשבתי שאני משוגעת, שאני זו שגורמת לכל הבעיות.הפגישה הראשונה פתחה לי את העיניים - הבנתי שאני לא לבד ושיש דרך החוצה. התהליך עם חלי החזיר לי את עצמי, את הביטחון שלי ואת השמחה.",
                time: "שינוי מלא תוך 4 חודשים"
              },
              {
                name: "מיכל ר.",
                role: "מנהלת פרויקטים",
                img: testimonial2,
                quote: "הייתי במערכת יחסים שבה הרגשתי שאני הולכת על ביצים כל הזמן. כל דבר שעשיתי היה 'לא נכון'. חלי עזרה לי להבין שזה לא אני - זה היה גזלייטינג. היא לימדה אותי לזהות את הדפוסים ולבנות גבולות בריאים. היום אני במקום אחר לגמרי, חזקה ובטוחה בעצמי.",
                time: "חזרה לביטחון עצמי תוך 6 שבועות"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-10 border-none shadow-2xl shadow-foreground/5 bg-background relative" data-testid={`card-testimonial-${i+1}`}>
                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <img src={t.img} alt={t.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/5" />
                      <div>
                        <h4 className="text-xl font-bold">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg text-foreground/80 leading-relaxed mb-6 italic">
                      "{t.quote}"
                    </blockquote>
                    <p className="text-sm text-primary font-bold tracking-wide uppercase">{t.time}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-1xl md:text-2xl font-bold text-primary">
              מעל 200 נשים כבר בחרו לשחרר עצמן
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background" data-testid="section-faq">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-faq-title">שאלות נפוצות</h2>
            <p className="text-muted-foreground text-xl" data-testid="text-faq-subtitle">
              תשובות לשאלות שנשים שואלות לפני שהן מתחילות את התהליך
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-background border-none rounded-2xl px-8 shadow-sm hover:shadow transition-shadow"
                >
                  <AccordionTrigger 
                    className="text-right text-lg font-bold py-6 hover:no-underline" 
                    data-testid={`accordion-faq-${index + 1}`}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden" data-testid="section-contact">
        <div className="absolute inset-0 z-0">
          <img
            src={ctaImage}
            alt="חלי במשרד הטיפולי"
            className="w-full h-full object-cover brightness-[0.4]"
            data-testid="img-contact"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-white" data-testid="text-contact-title">
                הרגע שלך<br /><span className="text-primary">להתחיל מחדש</span>
              </h2>
              <p className="text-xl text-white mb-10 leading-relaxed" data-testid="text-contact-subtitle">
                הפגישה הראשונה שלנו היא במחיר סמלי בלבד. בלי התחייבות, בלי לחץ - רק מרחב בטוח להבין מה קורה ולראות איך אני יכולה לעזור לך.
              </p>
              
              <div className="grid gap-4">
                {[
                  "הבנה ברורה של המצב שלך",
                  "זיהוי דפוסים רעילים בקשר",
                  "כלים ראשונים להתמודדות",
                  "תחושת הקלה ותמיכה אמיתית"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group" data-testid={`text-contact-benefit-${i+1}`}>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <CheckCircle className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-lg font-medium text-white">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 border-none shadow-2xl bg-background rounded-[2rem]" data-testid="card-contact-form">
                <h3 className="text-2xl font-bold mb-8 text-center">קבעי את הפגישה שלך עכשיו</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>שם מלא</FormLabel>
                          <FormControl>
                            <Input {...field} className="rounded-xl h-12 bg-background" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>אימייל</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="rounded-xl h-12 bg-background" data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>טלפון</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} className="rounded-xl h-12 bg-background" data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ספרי לי קצת על עצמך (אופציונלי)</FormLabel>
                          <FormControl>
                            <Textarea rows={4} {...field} className="rounded-xl bg-background resize-none" data-testid="input-message" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20" 
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? "שולחת..." : "שליחה"}
                    </Button>
                    
                    <p className="text-sm text-center text-muted-foreground">
                      המקומות מוגבלים • הפגישה נקבעת תוך 24-48 שעות
                    </p>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground" data-testid="section-stats">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-10 text-center">
            <div data-testid="stat-women">
              <span className="text-4xl md:text-6xl font-bold block mb-2">200+</span>
              <p className="text-lg opacity-80 font-medium">נשים שהשתחררו</p>
            </div>
            
            <div data-testid="stat-free">
              <span className="text-4xl md:text-6xl font-bold block mb-2">49 ₪</span>
              <p className="text-lg opacity-80 font-medium">פגישה ראשונה</p>
            </div>
            
            <div data-testid="stat-time">
              <span className="text-4xl md:text-6xl font-bold block mb-2">24-48</span>
              <p className="text-lg opacity-80 font-medium">שעות לקביעה</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border/50" data-testid="section-footer">
        <div className="container mx-auto px-6 text-center">
          <img 
            src={logoImg} 
            alt="חלי לב - לוגו" 
            className="h-20 md:h-24 w-auto object-contain mx-auto mb-8 opacity-90"
            data-testid="img-footer-logo"
          />
          <p className="text-muted-foreground text-lg mb-4" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Toxic Free - חלי לב. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
}