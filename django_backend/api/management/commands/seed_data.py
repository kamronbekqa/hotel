from django.core.management.base import BaseCommand
from api.models import Dacha

class Command(BaseCommand):
    help = 'Seeds initial dacha data'

    def handle(self, *args, **kwargs):
        dachas_data = [
            {
                'title': 'Charvak Premium Resort',
                'description': 'Gidrometeodan tepada joylashgan dabdabali dacha. Basseyndan Charvak suv omboriga ajoyib ko\'rinish. Barcha qulayliklar mavjud.',
                'price': 500,
                'type': 'rent',
                'location': 'Charvak, Toshkent vil.',
                'features': ['Charvak manzarasi', 'Qishki basseyn', 'Sauna', 'Bilyard']
            },
            {
                'title': 'Chimgan Forest Lodge',
                'description': 'Archa va qarag\'aylar orasida joylashgan shinam dacha. Tabiat qo\'ynida dam olishni xohlovchilar uchun eng yaxshi tanlov.',
                'price': 300,
                'type': 'rent',
                'location': 'Chimgan, Bo\'stonliq',
                'features': ['O\'rmon manzarasi', 'Kamin', 'BBQ zona']
            },
            {
                'title': 'Beldersay Sky View',
                'description': 'Eng baland nuqtada joylashgan zamonaviy dacha. Kanat yo\'liga juda yaqin. High-tech uslubida qurilgan.',
                'price': 700,
                'type': 'rent',
                'location': 'Beldersoy, Toshkent vil.',
                'features': ['Panorama oyna', 'Isitiladigan basseyn', 'Smart Home']
            },
            {
                'title': 'Humsan Riverside Villa',
                'description': 'Chiroyli tabiat qo\'ynida, daryo bo\'yida joylashgan dacha. Oilaviy hordiq uchun ideal joy.',
                'price': 250,
                'type': 'rent',
                'location': 'Humsan, Toshkent vil.',
                'features': ['Daryo bo\'yi', 'Tapchan', 'Mevazor bog\'']
            }
        ]

        for data in dachas_data:
            Dacha.objects.get_or_create(
                title=data['title'],
                defaults=data
            )
        
        self.stdout.write(self.style.SUCCESS('Muvaffaqiyatli dacha ma\'lumotlari qo\'shildi!'))
