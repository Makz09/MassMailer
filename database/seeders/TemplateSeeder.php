<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Template;

class TemplateSeeder extends Seeder
{
    public function run(): void
    {
        Template::truncate();
        $templates = [
            [
                'name' => 'Annual Vaccination Reminder',
                'subject' => 'Time for {{patient_name}}\'s Yearly Protection!',
                'category' => 'Vaccination',
                'body' => "Hi {{owner_name}},\n\nIt's that time of year again! {{patient_name}} is due for their annual vaccinations to stay protected against common feline diseases.\n\nKeeping up with shots is the best way to ensure a long, healthy life for your furry friend. \n\nClick here to book an appointment: [Link]\n\nStay pawsome,\nThe Cat Clinic Team",
            ],
            [
                'name' => 'Kitten First Checkup',
                'subject' => 'Welcome to the Family! Kitten Wellness Pack',
                'category' => 'Health Awareness',
                'body' => "Hello {{owner_name}},\n\nCongratulations on your new kitten, {{patient_name}}! The first few months are crucial for their development. \n\nOur Kitten Wellness Pack covers:\n- Initial Health Exam\n- First Round of Vaccinations\n- Nutrition Consultation\n- Deworming\n\nLet's get {{patient_name}} off to a great start! Reply to this email to schedule your first visit.",
            ],
            [
                'name' => 'Senior Cat Wellness',
                'subject' => 'Special Care for Your Senior Companion: {{patient_name}}',
                'category' => 'Health Awareness',
                'body' => "Hi {{owner_name}},\n\nAs {{patient_name}} gets older, their health needs change. Cats are masters at hiding discomfort, so regular senior screenings are vital.\n\nWe recommend a bi-annual checkup for cats over 7 years old to monitor kidney function, joint health, and dental status.\n\nLet's ensure {{patient_name}}\'s golden years are comfortable and happy.",
            ],
            [
                'name' => 'Dental Health Month',
                'subject' => 'Is {{patient_name}}\'s Smile Sparkling?',
                'category' => 'Health Awareness',
                'body' => "Did you know that 80% of cats over age 3 have some form of dental disease?\n\nThis month, we are offering a 10% discount on professional dental cleanings. Bad breath can be a sign of underlying issues. \n\nBook a dental assessment for {{patient_name}} today!",
            ],
            [
                'name' => 'Feline Stress Management',
                'subject' => 'Helping {{patient_name}} Stay Calm and Happy',
                'category' => 'Wellness',
                'body' => "Hi {{owner_name}},\n\nCats can be sensitive to changes in their environment. Whether it's a new move, a new pet, or even just rearranged furniture, {{patient_name}} might feel a bit stressed.\n\nCheck out our latest blog post on 'Creating a Stress-Free Sanctuary for Your Cat' for tips on pheromone diffusers, vertical space, and safe hiding spots.",
            ],
            [
                'name' => 'Weight Management Tips',
                'subject' => 'Keeping {{patient_name}} Fit and Fabulous!',
                'category' => 'Wellness',
                'body' => "Hi {{owner_name}},\n\nMaintaining a healthy weight is key to preventing diabetes and joint pain in cats. If {{patient_name}} has gained a little 'extra fluff' recently, we're here to help!\n\nSchedule a nutrition consultation to find the perfect diet plan for your feline friend.",
            ],
            [
                'name' => 'Flea & Tick Prevention',
                'subject' => 'Don\'t Let the Bugs Bite {{patient_name}}!',
                'category' => 'Health Awareness',
                'body' => "It's parasite season! Even indoor cats like {{patient_name}} can be at risk from hitchhiking fleas or ticks brought in on clothes.\n\nPick up your monthly preventative at The Cat Clinic this week. Protect your home and your cat!",
            ],
            [
                'name' => 'Grooming Services Announcement',
                'subject' => 'A Spa Day for {{patient_name}}? Yes Please!',
                'category' => 'Grooming',
                'body' => "Is {{patient_name}} struggling with mats or shedding? Our feline-certified groomers specialize in gentle, low-stress grooming.\n\nServices include:\n- Lion Cuts\n- Sanitary Trims\n- De-shedding Treatments\n- Nail Trims\n\nBook {{patient_name}}\'s spa day today!",
            ],
            [
                'name' => 'Indoor Enrichment Guide',
                'subject' => 'Boredom Busters for {{patient_name}}',
                'category' => 'Wellness',
                'body' => "Hi {{owner_name}},\n\nKeep {{patient_name}} sharp and active with indoor enrichment! From puzzle feeders to window perches (cat TV!), there are so many ways to engage their natural instincts.\n\nNeed ideas? Stop by our clinic to see our curated selection of feline enrichment toys.",
            ],
            [
                'name' => 'Microchipping Safety',
                'subject' => 'The Best Way to Bring {{patient_name}} Home',
                'category' => 'Health Awareness',
                'body' => "Collars can break, but a microchip is permanent. If {{patient_name}} ever slips out the door, a microchip is their ticket back to you.\n\nIt's a quick, painless procedure that we can do during any visit. Ask us about microchipping {{patient_name}} next time you're in!",
            ],
            [
                'name' => 'Chronic Kidney Disease Awareness',
                'subject' => 'Monitoring {{patient_name}}\'s Kidney Health',
                'category' => 'Health Awareness',
                'body' => "Kidney issues are common in older cats. Early detection through bloodwork is the most effective way to manage the condition and maintain quality of life.\n\nIs {{patient_name}} drinking more water than usual? Let's check their levels.",
            ],
            [
                'name' => 'Post-Surgery Care Instructions',
                'subject' => 'Helping {{patient_name}} Recover Comfortably',
                'category' => 'Emergency',
                'body' => "Hi {{owner_name}},\n\nAs {{patient_name}} recovers from their recent procedure, please remember to:\n- Keep them in a quiet, confined space.\n- Monitor the incision site for redness or swelling.\n- Ensure they are eating and drinking normally.\n\nCall us immediately if you have any concerns!",
            ],
            [
                'name' => 'Holiday Safety Tips',
                'subject' => 'Keeping {{patient_name}} Safe This Holiday Season',
                'category' => 'Health Awareness',
                'body' => "From toxic lilies to dangerous tinsel, the holidays can be tricky for curious cats like {{patient_name}}.\n\nCheck out our 'Holiday Hazard Guide' to ensure a safe and festive time for your entire family.",
            ],
            [
                'name' => 'Deworming Schedule',
                'subject' => 'Time for {{patient_name}}\'s Routine Deworming',
                'category' => 'Vaccination',
                'body' => "Routine deworming is essential even for indoor cats. It protects both {{patient_name}} and your family from zoonotic parasites.\n\nDrop by to pick up {{patient_name}}\'s dose today!",
            ],
            [
                'name' => 'Feline Nutrition FAQ',
                'subject' => 'What Should {{patient_name}} Be Eating?',
                'category' => 'Wellness',
                'body' => "Wet food vs. dry food? Grain-free? High protein? Nutrition can be confusing!\n\nWe've compiled an FAQ based on the most common questions from our cat parents. Read more here: [Link]",
            ],
            [
                'name' => 'Diabetes Awareness in Cats',
                'subject' => 'Managing Feline Diabetes for {{patient_name}}',
                'category' => 'Health Awareness',
                'body' => "A diagnosis of diabetes can be overwhelming, but with the right diet and insulin management, cats like {{patient_name}} can live long, happy lives.\n\nWe offer training for home glucose monitoring and injections. You're not alone!",
            ],
            [
                'name' => 'Summer Heatwave Alert',
                'subject' => 'Keep {{patient_name}} Cool This Week!',
                'category' => 'Emergency',
                'body' => "Temperatures are rising! Ensure {{patient_name}} has access to plenty of fresh water and a cool, shaded area.\n\nSigns of heatstroke include panting, lethargy, and bright red gums. If you see these, call us immediately.",
            ],
            [
                'name' => 'New Branch Opening',
                'subject' => 'The Cat Clinic is Growing!',
                'category' => 'Newsletter',
                'body' => "We are excited to announce our newest branch opening in [Location]! \n\nNow it's even easier to get the specialized feline care that {{patient_name}} deserves. Come visit our new state-of-the-art facility!",
            ],
            [
                'name' => 'Refer-a-Friend Rewards',
                'subject' => 'Share the Love (and Get a Discount!)',
                'category' => 'Newsletter',
                'body' => "Hi {{owner_name}},\n\nDo you have friends with feline family members? Refer them to The Cat Clinic! \n\nWhen they book their first visit, both you and your friend will receive 10% off your next consultation. Thank you for being part of our community!",
            ],
            [
                'name' => 'End of Life Support',
                'subject' => 'Compassionate Care for {{patient_name}}',
                'category' => 'Health Awareness',
                'body' => "Saying goodbye is the hardest part of being a pet parent. We are here to support you and {{patient_name}} with compassion and dignity.\n\nWe offer hospice care and peaceful end-of-life services when the time comes. Lean on us.",
            ],
        ];

        foreach ($templates as $t) {
            $styledBody = $this->wrapInModernTemplate($t['body']);
            
            Template::create(array_merge($t, [
                'body' => $styledBody,
                'status' => 'Live',
                'preview_image' => 'https://placehold.co/600x400/084C4B/FFFFFF?text=' . urlencode($t['name']),
            ]));
        }
    }

    private function wrapInModernTemplate($content)
    {
        $settings = \App\Models\ClinicSetting::first();
        $logoPath = $settings->logo_path ?? 'images/clinic_logo_1777717234.png';
        $logoUrl = filter_var($logoPath, FILTER_VALIDATE_URL) ? $logoPath : url($logoPath);
        
        $clinicName = $settings->name ?? 'The Cat Clinic';

        // Convert newlines to paragraphs
        $formattedContent = '<p>' . str_replace("\n\n", '</p><p>', $content) . '</p>';
        $formattedContent = str_replace("\n", '<br>', $formattedContent);

        return '
<div style="font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <div style="background-color: #084C4B; padding: 40px; text-align: center;">
            <img src="' . $logoUrl . '" alt="' . $clinicName . '" style="max-width: 150px; margin-bottom: 20px; border-radius: 12px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;">' . $clinicName . '</h1>
            <p style="color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Specialized Feline Care</p>
        </div>
        <div style="padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;">
            ' . $formattedContent . '
        </div>
        <div style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;">
            <p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">© 2026 ' . $clinicName . '</p>
            <p style="margin: 8px 0 0;">This email was sent to you because you are a valued client. <br> <a href="#" style="color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;">Manage Preferences</a> • <a href="#" style="color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;">Privacy Policy</a></p>
        </div>
    </div>
</div>';
    }
}
