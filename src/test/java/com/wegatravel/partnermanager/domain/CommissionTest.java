package com.wegatravel.partnermanager.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wegatravel.partnermanager.web.rest.TestUtil;

public class CommissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commission.class);
        Commission commission1 = new Commission();
        commission1.setId(1L);
        Commission commission2 = new Commission();
        commission2.setId(commission1.getId());
        assertThat(commission1).isEqualTo(commission2);
        commission2.setId(2L);
        assertThat(commission1).isNotEqualTo(commission2);
        commission1.setId(null);
        assertThat(commission1).isNotEqualTo(commission2);
    }
}
