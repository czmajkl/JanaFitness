<?php
declare(strict_types=1);
require __DIR__ . '/../_bootstrap.php';
require __DIR__ . '/../_packages.php';
require_method('GET');
require_admin();
db()->exec("UPDATE coaching_periods SET status='expired' WHERE status='active' AND ends_at IS NOT NULL AND ends_at <= UTC_TIMESTAMP()");
$sql = "SELECT u.id, u.name, u.email, u.created_at AS registered_at,
    cp_profile.phone AS phone, cp_profile.age AS age, cp_profile.height_cm AS height_cm, cp_profile.weight_kg AS weight_kg,
    (SELECT s.id FROM intake_submissions s WHERE s.user_id=u.id ORDER BY s.created_at DESC LIMIT 1) AS submission_id,
    (SELECT s.status FROM intake_submissions s WHERE s.user_id=u.id ORDER BY s.created_at DESC LIMIT 1) AS submission_status,
    (SELECT p.id FROM training_plans p WHERE p.user_id=u.id ORDER BY p.created_at DESC LIMIT 1) AS plan_id,
    (SELECT p.status FROM training_plans p WHERE p.user_id=u.id ORDER BY p.created_at DESC LIMIT 1) AS plan_status,
    (SELECT cp.kind FROM coaching_periods cp WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_kind,
    (SELECT cp.status FROM coaching_periods cp WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_status,
    (SELECT p.slug FROM coaching_periods cp LEFT JOIN packages p ON p.id=cp.package_id WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_package_slug,
    (SELECT p.title FROM coaching_periods cp LEFT JOIN packages p ON p.id=cp.package_id WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_package_title,
    (SELECT cp.starts_at FROM coaching_periods cp WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_starts_at,
    (SELECT cp.ends_at FROM coaching_periods cp WHERE cp.user_id=u.id ORDER BY FIELD(cp.status, 'active','waiting_for_intake','waiting_for_plan','expired','cancelled'), (cp.kind='paid') DESC, cp.created_at DESC LIMIT 1) AS period_ends_at,
    (SELECT COUNT(*) FROM messages m WHERE m.sender_user_id=u.id AND m.recipient_user_id=(SELECT a.id FROM users a WHERE a.role='admin' AND a.active=1 ORDER BY a.id LIMIT 1) AND m.read_at IS NULL) AS unread_messages,
    (SELECT o.created_at FROM orders o WHERE o.user_id=u.id AND o.status='paid' ORDER BY o.created_at DESC LIMIT 1) AS last_paid_order_at,
    (SELECT o.amount_czk FROM orders o WHERE o.user_id=u.id AND o.status='paid' ORDER BY o.created_at DESC LIMIT 1) AS last_paid_order_amount
    FROM users u
    LEFT JOIN client_profiles cp_profile ON cp_profile.user_id=u.id
    WHERE u.role='client' AND u.active=1 ORDER BY u.created_at DESC LIMIT 200";
$rows = db()->query($sql)->fetchAll();
$clients = array_map(static fn(array $row): array => [
    'id' => (int) $row['id'],
    'name' => (string) $row['name'],
    'email' => (string) $row['email'],
    'registeredAt' => utc_iso($row['registered_at']),
    'phone' => $row['phone'] !== null ? (string) $row['phone'] : null,
    'age' => $row['age'] !== null ? (int) $row['age'] : null,
    'heightCm' => $row['height_cm'] !== null ? (float) $row['height_cm'] : null,
    'weightKg' => $row['weight_kg'] !== null ? (float) $row['weight_kg'] : null,
    'submissionId' => $row['submission_id'] !== null ? (int) $row['submission_id'] : null,
    'submissionStatus' => $row['submission_status'],
    'planId' => $row['plan_id'] !== null ? (int) $row['plan_id'] : null,
    'planStatus' => $row['plan_status'],
    'periodKind' => $row['period_kind'],
    'periodStatus' => $row['period_status'],
    'periodPackageTitle' => $row['period_package_title'] !== null ? canonical_package_title((string) ($row['period_package_slug'] ?? ''), (string) $row['period_package_title']) : null,
    'periodStartsAt' => utc_iso($row['period_starts_at']),
    'periodEndsAt' => utc_iso($row['period_ends_at']),
    'unreadMessages' => (int) ($row['unread_messages'] ?? 0),
    'lastPaidOrderAt' => utc_iso($row['last_paid_order_at']),
    'lastPaidOrderAmountCZK' => $row['last_paid_order_amount'] !== null ? (int) $row['last_paid_order_amount'] : null,
], $rows);
json_success(['clients' => $clients]);
