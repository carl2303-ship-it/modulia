# Bootstrap CRM Modulia

## 1. Appliquer la migration

Coller le SQL de `supabase/migrations/20260811180000_crm_backoffice.sql`
dans le SQL Editor du dashboard Supabase du projet Modulia.

Ou, si le projet est linké :

```bash
npx supabase link --project-ref yjnkhwgfxycbdmhfdtlp
npx supabase db push
```

## 2. Créer les comptes

Dans **Authentication > Users**, créer email + password pour :

- 2 propriétaires
- 1 showroom
- N commerciaux IAD

Le trigger crée automatiquement un `profiles` (rôle `agent` par défaut).

## 3. Attribuer les rôles

```sql
update public.profiles
set role = 'owner', full_name = 'Propriétaire 1', active = true
where email = 'owner1@example.com';

update public.profiles
set role = 'showroom', full_name = 'Showroom', active = true
where email = 'showroom@example.com';

update public.profiles
set role = 'agent',
    full_name = 'Commercial IAD',
    agency = 'IAD',
    commission_rate_pct = 5,
    active = true
where email = 'agent@example.com';
```

## 4. Utilisation

1. Se connecter sur `/login`
2. Ouvrir `/backoffice`
3. Sur le site public, « Espace pro » indique la session ; les demandes de devis sont auto-assignées
